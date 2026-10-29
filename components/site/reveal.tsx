"use client";

import { motion } from "motion/react";
import type { ComponentProps } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = ComponentProps<typeof motion.div> & { delay?: number };

/**
 * Brings content forward out of depth the first time it scrolls into view —
 * a quieter echo of the perspective tunnel hero. MotionConfig's reducedMotion="user"
 * drops the transforms (leaving a plain fade) for visitors who ask for less motion.
 */
export function Reveal({ delay = 0, ...props }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28, z: -120, rotateX: 6, transformPerspective: 1200 }}
            whileInView={{ opacity: 1, y: 0, z: 0, rotateX: 0, transformPerspective: 1200 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: EASE, delay }}
            {...props}
        />
    );
}
