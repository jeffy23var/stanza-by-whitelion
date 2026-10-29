@AGENTS.md

# Project rules

- Stack: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Motion
- Use the ui-ux-pro-max skill for all design decisions
  - Its search script is at `.claude/skills/ui-ux-pro-max/scripts/search.py` (run from the project root with `python`)
- Animations: import from "motion/react"; respect reduced motion
- Accessibility: WCAG AA contrast, visible focus states, semantic HTML
- Images: use next/image with alt text
- Run `npm run build` and `npm run lint` before finishing a task
