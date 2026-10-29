import type { ReactNode } from "react";

// Re-mounts on every navigation, so each page arrives with the tunnel's "from depth"
// entrance. Plain CSS so it plays before JavaScript loads and never delays the hero text.
export default function Template({ children }: { children: ReactNode }) {
    return <div className="page-enter">{children}</div>;
}
