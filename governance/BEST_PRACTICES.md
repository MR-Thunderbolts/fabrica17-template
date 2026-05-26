# BEST_PRACTICES.md — Success Loop (A+ Patterns)

> **Status:** Active | **Domain:** GLOBAL GOVERNANCE
> **Owner:** Curator Agent

This file captures proven patterns extracted from successful audits. The QA Agent feeds patterns here after Grade A/A+ results. All agents should consult this before implementing.

---

## Pattern Registry

### 1. Token-First Styling
**Source:** Hero.Split audit (Grade A)
**Pattern:** Never write `padding: 24px`. Always write `padding: var(--space-6)`.
**Why:** Token-first styling ensures instant brand changes via `client-brand.css` without touching component code.

### 2. Section.Master as Layout Engine
**Source:** Page assembly audit (Grade A)
**Pattern:** Use `Section.Master` with `data-padding` and `data-bg` attributes to wrap all page sections.
**Why:** Provides consistent spacing and background theming across the entire site. Eliminates ad-hoc `<section>` styling.

### 3. Snippet > Slot (Always)
**Source:** Modal refactor (Grade A)
**Pattern:** Use `{#snippet content()}...{/snippet}` instead of `<slot>` for named content areas.
**Why:** Snippets provide type-safety and explicit rendering control. They prevent the "phantom slot" bug.

### 4. $bindable for Interactive State
**Source:** Modal.isOpen (Grade A)
**Pattern:** Use `$bindable()` for any state that the parent needs to control.
**Why:** Enables both controlled (parent manages state) and uncontrolled (component manages state) patterns.

### 5. Data Attributes for State-Driven Styling
**Source:** Section.Master (Grade A+)
**Pattern:** Use `data-padding="large"` + CSS `[data-padding="large"] { ... }` instead of conditional class strings.
**Why:** Cleaner HTML, easier to debug in DevTools, and decouples logic from styling.

### 6. Figma Token Parity Check
**Source:** Token sync session (Grade A)
**Pattern:** Always run `mcp_FigmaDesktop_get_variable_defs` on the root frame BEFORE syncing tokens.
**Why:** Prevents stale tokens from creeping into `figma-tokens.json`.

### 7. Compound Namespace Folders
**Source:** Bits UI investigation + Sprint 1 (Grade A)
**Pattern:** Every multi-part component MUST live in a folder with `index.ts` namespace export.
**Why:** Enables `import * as Dialog from '...'` dot-notation. IDE auto-suggests sub-components.

### 8. fabricaAttrs() Builder
**Source:** Sprint 0 infrastructure (Grade A+)
**Pattern:** Use `fabricaAttrs('component-name', { state })` to generate data attributes.
**Why:** Centralizes the `data-fabrica-*` convention. Ensures zero typos in attribute names.

### 9. WithChild Renderless Override
**Source:** Sprint 1 Button refactor (Grade A)
**Pattern:** Accept a `child` snippet alongside `children`. If `child` is provided, pass `{ props }` and let consumer render their own element.
**Why:** Full element control — e.g., rendering a `<a>` instead of `<button>` while keeping all styling + ARIA.

### 10. Context-Based Compound State
**Source:** Sprint 2 Dialog (Grade A+)
**Pattern:** Root component uses `setContext()` with a getter for reactive state. Sub-components read via `getContext()`.
**Why:** Eliminates prop drilling across 5 sub-components. State is always in sync.

### 11. Icon Library & Style Convention
**Source:** Sprint 3 Icon Library Simplification (Grade A+)
**Pattern:** MynaUI Icons (`~icons/mynaui/*`) is established as the default, official icon library for both the factory components and standard client projects. Because MynaUI features highly refined, modern outline vectors with exceptionally consistent weights and rounded stroke caps, separate weight sub-collections (bold, light, thin) are no longer required.
- **Default imports:** Always import directly from `~icons/mynaui/<icon>`.
- **Project Specificity:** If the client's project specifications mandate a different collection (e.g. Phosphor `~icons/ph/*`, Lucide `~icons/lucide/*`, or a local custom SVG collection), it is fully permitted to use them to match the project requirements.
**Why:** Simplifies the design workflow, maintains a sleek and modern cohesive aesthetic, and ensures absolute flexibility for custom client specifications.

---

## Anti-Patterns (Captured Failures)

| Anti-Pattern | Frequency | Fix |
|:---|:---:|:---|
| Hardcoded hex in `<style>` | 3x | Use `var(--color-*)` tokens |
| `100vw` causing horizontal overflow | 2x | Use `overflow-x: hidden` on parent |
| Nested `SectionMaster` in carousel | 1x | Use `fullWidth={true}` |
| Missing `loading="lazy"` on images | 2x | Add to all below-fold `<img>` |
| Importing `.svelte` directly instead of namespace | 0x (prevented) | Always import from `index.ts` |
| Inline prop types instead of `_shared/types.ts` | 0x (prevented) | Centralize in types.ts |
| Using uncompiled Tailwind classes (e.g., `flex gap-2`) | 1x | Replace with scoped custom CSS classes |
| Forcing `display: flex` on inline components | 1x | Use `inline-flex` to prevent unwanted line breaks |
