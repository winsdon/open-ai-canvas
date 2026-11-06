import { useLayoutEffect, useRef, type RefObject } from "react";
import { useNavigate } from "react-router";
import { useReducedMotion } from "motion/react";

/** 侧栏常驻选中背景：先提交点击动效，再让路由挂载新页面。 */
export function useWorkspaceNavIndicator({ containerRef, activeId, collapsed, keyboardNavigation }: { containerRef: RefObject<HTMLDivElement | null>; activeId: string; collapsed: boolean; keyboardNavigation: RefObject<boolean> }) {
    const indicatorRef = useRef<HTMLSpanElement>(null);
    const animationRef = useRef<Animation | null>(null);
    const lastTransform = useRef("");
    const reducedMotion = useReducedMotion();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const container = containerRef.current;
        const indicator = indicatorRef.current;
        if (!container || !indicator) return;
        let previewTarget: HTMLElement | null = null;
        let frame = 0;
        let task = 0;
        const cancelNavigation = () => {
            window.cancelAnimationFrame(frame);
            window.clearTimeout(task);
        };
        const updatePosition = () => {
            const target = previewTarget || container.querySelector<HTMLElement>(".app-workspace-nav-link.is-active");
            if (!target) {
                indicator.style.opacity = "0";
                lastTransform.current = "";
                return;
            }
            const bounds = container.getBoundingClientRect();
            const row = target.getBoundingClientRect();
            const transform = `translate3d(${row.left - bounds.left}px, ${row.top - bounds.top}px, 0)`;
            indicator.style.width = `${row.width}px`;
            indicator.style.height = `${row.height}px`;
            indicator.style.opacity = "1";
            // 路由提交和 ResizeObserver 不重启动画；连续点击从当前可见位置继续。
            if (transform === lastTransform.current) return;
            const from = window.getComputedStyle(indicator).transform;
            animationRef.current?.cancel();
            indicator.style.transform = transform;
            if (lastTransform.current && !reducedMotion && !keyboardNavigation.current) {
                animationRef.current = indicator.animate([{ transform: from }, { transform }], { duration: 180, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" });
            }
            lastTransform.current = transform;
        };

        const handleClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0 || event.detail === 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
            const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a.app-workspace-nav-link[data-nav-id]") : null;
            const href = link?.getAttribute("href");
            if (!link || !container.contains(link) || !href?.startsWith("/") || href.startsWith("//") || link.target || link.hasAttribute("download")) return;
            if (href === window.location.pathname + window.location.search + window.location.hash) return;
            event.preventDefault();
            previewTarget = link;
            updatePosition();
            cancelNavigation();
            // 先让浏览器提交动画帧；不等待动画结束，也不在页面渲染之后才定位滑块。
            frame = window.requestAnimationFrame(() => {
                frame = 0;
                task = window.setTimeout(() => {
                    task = 0;
                    void navigate(href);
                }, 0);
            });
        };

        updatePosition();
        const observer = new ResizeObserver(updatePosition);
        observer.observe(container);
        container.querySelectorAll(".app-workspace-nav-link").forEach((row) => observer.observe(row));
        container.addEventListener("click", handleClick);
        return () => {
            observer.disconnect();
            container.removeEventListener("click", handleClick);
            cancelNavigation();
        };
    }, [activeId, collapsed, containerRef, keyboardNavigation, navigate, reducedMotion]);

    useLayoutEffect(
        () => () => {
            animationRef.current?.cancel();
        },
        [],
    );

    return indicatorRef;
}
