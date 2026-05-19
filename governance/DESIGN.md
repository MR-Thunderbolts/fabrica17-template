# DESIGN.md — Token Specification (Generic Template)

> This file is the **single source of truth** for all design tokens in the system.
> It defines the token API (names, categories, defaults). Base values are NEUTRAL. Brand-specific overrides are applied as CSS custom property overrides.

---

## Token Architecture

```text
Primitives (raw values) -> Semantic (meaningful names) -> Component (specific UI elements)
```

---

## 1. Colors

### Primitive Palette (Neutral Base)
| Token | CSS Variable | Default Value |
|---|---|---|
| Gray 50 | `--color-gray-50` | `#FAFAFA` |
| Gray 900 | `--color-gray-900` | `#171717` |
| White | `--color-white` | `#FFFFFF` |
| Black | `--color-black` | `#000000` |

### Semantic Colors
| Token | CSS Variable | Default (Neutral) | Override Placeholder |
|---|---|---|---|
| Primary | `--color-primary` | `var(--color-gray-800)` | `[BRAND_PRIMARY_COLOR]` |
| Primary Dark | `--color-primary-dark` | `var(--color-gray-900)` | `[BRAND_PRIMARY_DARK]` |
| Secondary | `--color-secondary` | `var(--color-gray-500)` | `[BRAND_SECONDARY]` |
| Background | `--color-neutral-bg` | `var(--color-gray-50)` | `[BRAND_BG]` |
| Text Primary | `--color-text-primary` | `var(--color-gray-900)` | `[BRAND_TEXT]` |

---

## 2. Typography

| Token | CSS Variable | Default (Neutral) | Override Placeholder |
|---|---|---|---|
| Headline | `--font-headline` | `system-ui, sans-serif` | `[BRAND_FONT_HEADLINE]` |
| Body | `--font-body` | `system-ui, sans-serif` | `[BRAND_FONT_BODY]` |

### Font Sizes (Scale)
| Token | CSS Variable | Value |
|---|---|---|
| Base | `--text-base` | `1rem` (16px) |
| 6XL | `--text-6xl` | `4.5rem` (72px) |

---

## AI Agent Instructions

When extracting tokens from Figma for a new client:
1. Map `Semantic/*` to colors.
2. Extract typography and apply to font families.
3. Generate `[client-name]-brand.css` with only the overridden tokens.
