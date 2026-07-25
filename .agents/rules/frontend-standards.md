---
trigger: glob
globs:
  - "apps/portfolio/**"
description: Frontend implementation rules governing code structure, state, modernization, and best practices in the portfolio app.
---

**Frontend Implementation Standards & Architecture:**

1. **Design Rule Synergy:** This rule works alongside `design-standards.md`. While `design-standards.md` handles visual and UX guidelines, this rule dictates code structure, implementation details, and frontend patterns.
2. **Component Architecture & Typing:**
   - **Separation of Concerns:** Strictly separate UI (presentation) from business logic. Abstract complex logic into custom hooks or utility functions.
   - **TypeScript Strictness:** Enforce strict TypeScript interfaces and types for all component props. Avoid `any`.
3. **Styling Enforcement:** Use Tailwind CSS utility classes primarily, adhering strictly to the project's established configuration and theme.
4. **Proactive Refactoring & Legacy Elimination:** 
   - When working within a file, proactively refactor messy or inefficient code you encounter, even if it extends slightly beyond the direct scope of the user's request. 
   - Actively replace deprecated APIs and outdated patterns (like older state management habits or legacy lifecycle patterns) with their modern equivalents as soon as you spot them. Leave the codebase cleaner and more modern than you found it.
5. **Robustness & Edge Cases:**
   - **Null Safety:** Strictly enforce null and undefined checks (using optional chaining `?.` and nullish coalescing `??`) to prevent runtime crashes.
   - **Async States:** Always implement explicit loading and error states for data-fetching or other async operations. Never leave the UI hanging without feedback.
6. **Modern Framework & Web Features:**
   - **Aggressive Modernization:** Aggressively adopt modern framework patterns (e.g., React 18+ hooks like `useId`, Server Components if applicable, and concurrent features) when refactoring or creating new code.
   - **Cutting-Edge Web Capabilities:** Leverage modern browser capabilities and modern CSS features (like CSS Container Queries, `:has()`, modern CSS grid, native `<dialog>` elements) for cleaner, more native implementations rather than relying on older polyfills or complex workarounds.
7. **Performance Optimization:**
   - **Asset & Code Splitting:** Automatically implement code-splitting and dynamic imports (`React.lazy`, `next/dynamic`, etc.) for large components. Automatically optimize images and assets (using modern formats or framework-specific image components).
   - **Memoization:** Proactively apply memoization (`useMemo`, `useCallback`, `React.memo`) where performance bottlenecks are likely or when passing complex objects as props.
8. **Accessibility (a11y):** Focus purely on visual accuracy, aesthetics, and functionality for now. Accessibility is currently a lower priority.
