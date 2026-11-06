import { afterAll, afterEach, expect, test } from "bun:test";
import { Window } from "happy-dom";

const dom = new Window({ url: "http://localhost/canvas" });
const originals = new Map<string, PropertyDescriptor | undefined>();
for (const [key, value] of Object.entries({ window: dom, document: dom.document, navigator: dom.navigator, HTMLElement: dom.HTMLElement, Element: dom.Element, Node: dom.Node, ResizeObserver: dom.ResizeObserver, IS_REACT_ACT_ENVIRONMENT: true })) {
    originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
}
const { act, useRef } = await import("react");
const { createRoot } = await import("react-dom/client");
const { Link, MemoryRouter, useLocation } = await import("react-router");
const { useWorkspaceNavIndicator } = await import("../src/components/layout/workspace-sidebar-indicator");
const frames = new Map<number, FrameRequestCallback>();
const tasks = new Map<number, () => void>();
const animations: Keyframe[][] = [];
let nextId = 0;
let unmount: (() => Promise<void>) | undefined;

dom.requestAnimationFrame = ((callback: FrameRequestCallback) => {
    frames.set(++nextId, callback);
    return nextId;
}) as typeof dom.requestAnimationFrame;
dom.cancelAnimationFrame = (id: number) => {
    frames.delete(id);
};
dom.setTimeout = ((callback: () => void) => {
    tasks.set(++nextId, callback);
    return nextId;
}) as typeof dom.setTimeout;
dom.clearTimeout = ((id: number) => {
    tasks.delete(id);
}) as typeof dom.clearTimeout;
Object.defineProperty(dom.HTMLElement.prototype, "animate", {
    configurable: true,
    value: (keyframes: Keyframe[]) => {
        animations.push(keyframes);
        return { cancel() {} };
    },
});
Object.defineProperty(dom.HTMLElement.prototype, "getBoundingClientRect", {
    configurable: true,
    value: function (this: HTMLElement) {
        const top = { canvas: 10, plugins: 110, skills: 210 }[this.dataset.navId || ""] || 0;
        return { left: 0, top, width: 150, height: 45, right: 150, bottom: top + 45, x: 0, y: top, toJSON() {} };
    },
});

function Harness() {
    const containerRef = useRef<HTMLDivElement>(null);
    const keyboardNavigation = useRef(false);
    const { pathname } = useLocation();
    const indicatorRef = useWorkspaceNavIndicator({ containerRef, activeId: pathname.slice(1), collapsed: false, keyboardNavigation });
    return (
        <>
            <output>{pathname}</output>
            <div ref={containerRef}>
                <span ref={indicatorRef} className="app-workspace-nav-active-pill" />
                {["canvas", "plugins", "skills"].map((id) => (
                    <Link key={id} to={`/${id}`} data-nav-id={id} className={`app-workspace-nav-link${pathname === `/${id}` ? " is-active" : ""}`}>
                        {id}
                    </Link>
                ))}
            </div>
        </>
    );
}

async function mount() {
    const host = document.createElement("div");
    document.body.append(host);
    const root = createRoot(host);
    await act(() =>
        root.render(
            <MemoryRouter initialEntries={["/canvas"]}>
                <Harness />
            </MemoryRouter>,
        ),
    );
    frames.clear();
    tasks.clear();
    animations.length = 0;
    unmount = async () => {
        await act(() => root.unmount());
        host.remove();
    };
    const click = async (id: string, options: MouseEventInit = {}) => {
        const event = new dom.MouseEvent("click", { bubbles: true, cancelable: true, button: 0, detail: 1, ...options });
        await act(() => {
            host.querySelector(`[data-nav-id="${id}"]`)!.dispatchEvent(event);
        });
        return event;
    };
    return { host, click };
}

async function paintAndNavigate() {
    const queuedFrames = [...frames.values()];
    frames.clear();
    await act(() => {
        queuedFrames.forEach((callback) => callback(0));
    });
    const queuedTasks = [...tasks.values()];
    tasks.clear();
    await act(() => {
        queuedTasks.forEach((callback) => callback());
    });
}

afterEach(async () => {
    await unmount?.();
    unmount = undefined;
    frames.clear();
    tasks.clear();
});
afterAll(() => {
    dom.happyDOM.abort();
    for (const [key, value] of originals) {
        if (value) Object.defineProperty(globalThis, key, value);
        else Reflect.deleteProperty(globalThis, key);
    }
});

test("starts click feedback before navigation and keeps it running through the route commit", async () => {
    const { host, click } = await mount();
    expect((await click("plugins")).defaultPrevented).toBe(true);
    expect(animations).toHaveLength(1);
    expect(animations[0][1].transform).toContain("110px");
    expect(host.querySelector("output")!.textContent).toBe("/canvas");
    await paintAndNavigate();
    expect(host.querySelector("output")!.textContent).toBe("/plugins");
    expect(animations).toHaveLength(1);
});

test("rapid clicks only navigate to the most recent destination", async () => {
    const { host, click } = await mount();
    await click("plugins");
    await click("skills");
    expect(frames.size).toBe(1);
    await paintAndNavigate();
    expect(host.querySelector("output")!.textContent).toBe("/skills");
});

test("modified clicks preserve native new-tab behavior", async () => {
    const { host, click } = await mount();
    const event = await click("plugins", { ctrlKey: true });
    expect(event.defaultPrevented).toBe(false);
    expect(animations).toHaveLength(0);
    expect(frames.size).toBe(0);
    expect(host.querySelector("output")!.textContent).toBe("/canvas");
});

test("keyboard activation navigates without waiting for a paint", async () => {
    const { host, click } = await mount();
    await click("plugins", { detail: 0 });
    expect(frames.size).toBe(0);
    expect(host.querySelector("output")!.textContent).toBe("/plugins");
});

test("unmount cancels a queued navigation", async () => {
    const { click } = await mount();
    await click("plugins");
    await unmount?.();
    unmount = undefined;
    expect(frames.size).toBe(0);
    expect(tasks.size).toBe(0);
});
