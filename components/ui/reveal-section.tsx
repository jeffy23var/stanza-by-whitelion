"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";

export default function RevealSection(props: ComponentProps<typeof motion.section>) {
    const reduce = useReducedMotion();

    return (
        <motion.section
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            {...props}
        />
    );
}
