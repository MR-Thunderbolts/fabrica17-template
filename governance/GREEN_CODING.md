# GREEN_CODING.md — Universal Sustainability Standards

> **Status:** Active | **Domain:** GLOBAL GOVERNANCE

---

## Carbon Budget Targets

| Grade | CO₂ per page load | Status |
|:---:|:---:|:---|
| **A+** (Elite) | ≤ 0.095g | 🟢 Target |
| **A** (Target) | ≤ 0.186g | 🟢 Acceptable |
| **B** | ≤ 0.372g | 🟡 Needs optimization |
| **C+** | > 0.372g | 🔴 Rejected |

---

## Performance Gates

| Metric | Budget | Tool |
|:---|:---:|:---|
| JS Bundle (gzipped) | < 150KB total | Vite build output |
| CSS Bundle (gzipped) | < 10KB total | Vite build output |
| DOM Nodes | < 1500 | Lighthouse |
| Time to Interactive (TTI) | < 2.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |

---

## W3C Web Sustainability Guidelines (WSG) Compliance

### 1. Static Site Generation (SSG)
- **DEFAULT:** All pages are pre-rendered at build time via `@sveltejs/adapter-static`.
- **RATIONALE:** SSG eliminates server-side compute on every request → dramatically lower energy usage.

### 2. Next-Gen Assets
- **Images:** WebP or AVIF only. JPEG/PNG are rejected.
- **Lazy loading:** All images below the fold MUST have `loading="lazy"` and `decoding="async"`.
- **Responsive:** Use `<picture>` with `srcset` when multiple breakpoints exist.

### 3. Local Fonts (Cero CDN)
- **Strict mode:** Fonts are self-hosted and subsetted.
- **Prototyping:** Google Fonts CDN is permitted ONLY during rapid prototyping. Must be replaced before production.

### 4. Icon Strategy
- Icons are served as discrete, optimized SVGs via `unplugin-icons`.
- **NEVER** import a full icon package. Import individual icons: `import IconSearch from '~icons/material-symbols/search'`.
- **NEVER** use icon font CDNs (Font Awesome CDN, etc.).

### 5. Zero External HTTP Requests (Strict)
Under strict Green Coding:
- No CDNs for fonts, icons, or scripts.
- No analytics scripts without explicit user consent.
- No third-party widgets that load external resources.

---

## CSS Custom Properties for Theming

Theming MUST NOT depend on JavaScript runtime evaluation.

```css
/* ✅ CORRECT — Pure CSS cascade */
:root {
  --color-primary: #171717;  /* Overridden by client-brand.css */
}

.button { background: var(--color-primary); }
```

```javascript
// ❌ PROHIBITED — JS-based theming
document.body.style.setProperty('--color-primary', brandColor);
```

---

## Tree-Shaking Enforcement

`vite.config.ts` MUST include:
```typescript
build: {
  rollupOptions: {
    treeshake: { moduleSideEffects: false }
  }
}
```

This ensures that importing a single `Button` component does NOT bundle the entire Navbar, Hero, and Table.

---

## Audit Checklist (QA Agent)

Before marking a page as production-ready:

- [ ] `bun run check` passes (0 errors)
- [ ] `bun run build` succeeds
- [ ] JS bundle < 150KB (check Vite output)
- [ ] No `<img>` without `loading="lazy"` below fold
- [ ] No hardcoded hex colors in components
- [ ] No external HTTP requests (strict mode)
- [ ] WCAG AA contrast ratio met for all text
