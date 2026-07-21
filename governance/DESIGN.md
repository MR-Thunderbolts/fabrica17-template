# DESIGN.md — Token Specification (Grayscale Baseline)

> This file is the **single source of truth** for the design token API.
> Implementation: `utils/tokens.css` (baseline, DO NOT EDIT per-client) + `cliente/tokens.css` (client overrides).
> Base values are 100% NEUTRAL GRAYSCALE. Brand identity is applied exclusively as semantic-token overrides in `cliente/tokens.css`.

---

## Token Architecture

```text
Primitives (gray scale, raw values)
    → Semantic (surface / text / border / interactive / status)
        → Components (consume ONLY the semantic layer)
```

Themes: `:root` = **light** (default) · `:root[data-theme="dark"]` = dark. The toggle lives in `utils/settings.svelte.ts`.

**Rules:**
- Factory components consume **only semantic tokens** (never `--color-gray-*` directly, never hex).
- Every token a component consumes MUST be defined in `utils/tokens.css`. No ghost tokens.
- Clients override semantic tokens only; primitives and scales stay untouched.

---

## 1. Colors

### Primitive Palette (Neutral Gray Scale)
`--color-white`, `--color-gray-50` … `--color-gray-950`, `--color-black`. **Hex is the authored source of truth** (Figma has no OKLCH concept — `tokens:sync` only ever writes hex); OKLCH achromatic (`oklch(L 0 0)`) is added as a `@supports` progressive-enhancement layer on top, never as the only declared value. See `OKLCH_CALIBRATION.md` §"Regla de Autoría" (grays need no P3 calibration; saturated client brand colors do).

### Semantic Colors (override targets for clients)

| Category | Tokens |
|---|---|
| Surfaces | `--color-bg-deep`, `--color-bg-base`, `--color-neutral-bg`, `--color-surface-base`, `--color-surface-muted`, `--color-surface-dark`, `--color-surface-tag` |
| Text | `--color-text-primary`, `--color-text-heading`, `--color-text-body`, `--color-text-secondary`, `--color-text-muted` |
| Borders | `--color-border-light`, `--color-border-card`, `--color-border-outline` |
| Interactive | `--color-primary`, `--color-primary-hover`, `--color-primary-foreground`, `--color-on-primary`, `--color-primary-glow`, `--color-accent-primary`, `--color-secondary`, `--hover-opacity` |
| Badge brand variant | `--color-brand-soft`, `--color-brand-text`, `--color-brand-border` |
| Status (keep hue for meaning) | `--color-success[-bg,-text,-glow]`, `--color-on-success`, `--color-warning[-bg,-text]`, `--color-danger[-bg,-text]` (`--color-error` = alias of danger) |

---

## 2. Typography

| Token | Default (Neutral) | Client Override |
|---|---|---|
| `--font-headline` | `system-ui` stack | Brand font, self-hosted woff2 subset |
| `--font-body` | `system-ui` stack | Brand font, self-hosted woff2 subset |
| `--font-mono` | `ui-monospace` stack | Optional |

### Type Scale (fluid, Major Third)
`--text-xs`, `--text-sm`, `--text-base`, `--text-md`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`, `--text-hero` — all `clamp()`-based (no breakpoint font sizes).

---

## 3. Spacing, Radius, Layout, Motion, Elevation

| Category | Tokens |
|---|---|
| Spacing (4px base) | `--space-1` … `--space-32` |
| Section rhythm | `--section-pad-sm/md/lg` (fluid) |
| Radius | `--radius-sm` (6) · `--radius-md` (12) · `--radius-lg` (20) · `--radius-xl` (28) · `--radius-full` |
| Layout | `--content-max`, `--gutter` (fluid), `--navbar-height` |
| Motion easing | `--ease-out-expo`, `--ease-in-expo`, `--ease-in-out` |
| Motion duration (100/300/500 rule) | `--dur-instant/fast/normal/slow/enter`, `--transition-fast` |
| Elevation | `--shadow-sm`, `--shadow-md` |

---

## AI Agent Instructions

When extracting tokens from Figma for a new client:
1. Map the client's `Semantic/*` Figma variables to the semantic tokens above (see `factory/scripts/token-mapping.ts`).
2. Run `bun run tokens:sync` — it writes the mapped tokens inside the FIGMA SYNC block of `cliente/tokens.css`.
3. Add manual overrides (fonts, radii, extra brand tokens) OUTSIDE the sync block in `cliente/tokens.css`.
4. For saturated brand colors, apply P3 calibration per `OKLCH_CALIBRATION.md`.
5. NEVER edit `utils/tokens.css` for a client, and never introduce a token that isn't declared in this spec without adding it to both `utils/tokens.css` and this file.
