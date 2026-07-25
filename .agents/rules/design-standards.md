---
trigger: model_decision
description: Apply this rule strictly whenever the user asks to create, redesign, or improve UI/UX elements, styling (CSS/Tailwind), or frontend animations.
---

**UI/UX Design Standards & Continuity:**

1. **Discovery First:** Before starting any design or UI-related task, you MUST inspect the core style files (e.g., `index.css`), global layout files, and a few core UI components. Do this to fully understand the existing design language.
2. **Design Continuity:** You must strictly maintain the existing design language. The color theme, overarching feel, and specific design quirks must stay intact.
3. **Typography Hierarchy:** Establish and strictly maintain a clear typography hierarchy. Use distinct font sizes, weights, and color contrasts (e.g., strong headers vs. muted body text) to cleanly guide the user's eye.
4. **Spacing & Rhythm:** Strictly adhere to a systematic spacing scale (e.g., a 4px/8px grid system) when creating or restructuring layouts. Ensure all components feel structurally rhythmic and cohesive.
5. **Micro-interactions (Vibe):** When adding hover states or click effects, aim for a snappy, fast, and highly responsive feel. Use bouncy effects and quick transitions to make the interface feel playful and dynamic.
6. **Improvisation & Mindful Animations:** While maintaining the core design, you are encouraged to improvise. Implement highly complex and thoughtful animations mindfully. Do not place animations everywhere indiscriminately; instead, use them purposefully where they significantly enhance the user experience.
7. **Color Usage:** Mostly utilize the predefined global theme. However, you are permitted to introduce new complementary colors or slight variations (using custom hex codes) if it significantly enhances the visual design.
8. **Responsiveness (Desktop-First):** Take a Desktop-First approach. Focus on making complex layouts and animations look incredible on large screens first, then scale them down or disable them gracefully for mobile devices.
9. **Component Granularity:** Break complex, highly animated UI sections into small, highly reusable, single-responsibility micro-components (e.g., separating buttons, cards, or animated wrappers into their own files) to keep the codebase clean and modular.
10. **Proactive Inconsistency Resolution:** Actively hunt for design inconsistencies (e.g., mismatched paddings, misaligned elements, inconsistent font weights, or colors that deviate from the global theme). If you spot an issue while working on a file or component, fix it on the fly without asking for explicit permission, irrespective of the specific task given.
