"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// "user" skips transform animations for visitors who prefer reduced motion
export default function MotionProvider({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
