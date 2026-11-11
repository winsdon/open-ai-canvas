// Exact PanelsTopLeft geometry at rest; closed regions supply the shared edges
// that become visible when the three panels separate.
export function WorkspaceCanvasNavIcon({ className, strokeWidth = 1.8 }: { className?: string; strokeWidth?: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <g className="canvas-nav-rest">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
            </g>
            <g className="canvas-nav-parts">
                <path className="canvas-nav-piece canvas-nav-top" d="M5 3h14a2 2 0 0 1 2 2v4H3V5a2 2 0 0 1 2-2Z" />
                <path className="canvas-nav-piece canvas-nav-left" d="M3 9h6v12H5a2 2 0 0 1-2-2Z" />
                <path className="canvas-nav-piece canvas-nav-right" d="M9 9h12v10a2 2 0 0 1-2 2H9Z" />
            </g>
        </svg>
    );
}
