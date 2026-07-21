# Impeccable — Frontend Design Skill

> Production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

**Status:** Installed. Reference `.md` files pending from user.  
**Register:** definir por proyecto — `brand` (landing/marketing: design IS the product) o `product` (app/tool: design serves the task).

---

## Shared Design Laws

### Color
- **Use OKLCH.** Reduce chroma as lightness → 0 or 100; high chroma at extremes looks garish.
- **Never use `#000` or `#fff`.** Tint every neutral toward brand hue (chroma 0.005–0.01).
- **Pick a color strategy BEFORE picking colors:**
  - **Restrained:** tinted neutrals + one accent ≤10%. Product default; brand minimalism.
  - **Committed:** one saturated color carries 30–60% of surface. Brand default for identity pages.
  - **Full palette:** 3–4 named roles, each used deliberately. Campaigns; data viz.
  - **Drenched:** the surface IS the color. Brand heroes, campaign pages.

### Theme
- Dark vs. light is never a default. Write one sentence of **physical scene**:
  - *Who uses this, where, under what ambient light, in what mood?*
  - If the sentence doesn't force the answer, add detail until it does.
  - Run the scene, not the category.

### Typography
- Cap body line length at **65–75ch**.
- Hierarchy through **scale + weight contrast** (≥1.25 ratio between steps).
- Avoid flat scales (same jump between every level).

### Layout
- **Vary spacing for rhythm.** Same padding everywhere is monotony.
- **Cards are the lazy answer.** Use only when truly the best affordance.
- **Nested cards are always wrong.**
- Don't wrap everything in a container. Most things don't need one.

### Motion
- **Don't animate CSS layout properties** (width, height, top, left).
- Ease out with **exponential curves** (ease-out-quart / quint / expo).
- **No bounce, no elastic.**

### Copy
- Every word earns its place.
- No restated headings, no intros that repeat the title.
- **No em dashes.** Use commas, colons, semicolons, periods, or parentheses.

---

## Absolute Bans

Match-and-refuse. If you're about to write any of these, rewrite with different structure.

| Ban | What it looks like | Alternative |
|-----|-------------------|-------------|
| **Side-stripe borders** | `border-left: 4px solid accent` on cards/alerts | Full borders, background tints, leading icons, or nothing |
| **Gradient text** | `background-clip: text` + gradient | Single solid color. Emphasis via weight or size |
| **Glassmorphism as default** | Blurs and glass cards used decoratively | Rare and purposeful, or nothing |
| **Hero-metric template** | Big number + small label + supporting stats + gradient | Rethink the data presentation |
| **Identical card grids** | Same-sized cards with icon + heading + text repeated | Vary size, layout, or affordance |
| **Modal as first thought** | Using a modal when inline/progressive alternatives exist | Exhaust inline, expandable, drawer options first |

---

## AI Slop Test

> If someone could look at this interface and say "AI made that" without doubt, it's failed.

**Two-altitude category-reflex check:**

1. **First-order:** Can someone guess theme + palette from category alone?
   - e.g. "sustainability → dark + green accent" ← the classic category reflex
   - Rework scene sentence and color strategy until answer isn't obvious from domain
   
2. **Second-order:** Can someone guess aesthetic family from category + anti-references?
   - "eco-tech that's not green → purple + editorial" ← also predictable
   - Rework until BOTH answers are non-obvious

---

## Project Audit Protocol

Cada proyecto de cliente debe auditarse contra las leyes de este skill antes del launch. Genera una tabla de violaciones en el `DESIGN.md` del cliente con este formato:

| # | Law | Violation | Location | Severity |
|---|-----|-----------|----------|----------|
| V1 | (ley violada) | (descripción concreta) | (`Componente.svelte`) | 🔴 Rewrite / 🟡 Fix / ⚠️ Review / ✅ Pass |

Cubre como mínimo: glassmorphism, identical card grids, pure black/white, flat spacing, category reflex, modal-first, motion curves, bounce/elastic, em dashes, gradient text, side-stripe borders.

Acompaña la tabla con:
1. **Color Strategy Assessment** — cuál de las 4 estrategias usa el proyecto y si está formalizada.
2. **Scene Sentence** — la frase de escena física que justifica el tema (dark/light).
3. **Register** — `brand` o `product`, y qué implica para las decisiones.

---

## Commands Available

| Category | Commands |
|----------|----------|
| **Build** | `craft`, `shape`, `teach`, `document`, `extract` |
| **Evaluate** | `critique`, `audit` |
| **Refine** | `polish`, `bolder`, `quieter`, `distill`, `harden`, `onboard` |
| **Enhance** | `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive` |
| **Fix** | `clarify`, `adapt`, `optimize` |
| **Iterate** | `live` |

> [!NOTE]
> Reference `.md` files for each command are pending. Once provided, they will be saved to `governance/impeccable/reference/`.

---

## Integration with Existing Skills

This skill complements `UI_UX_SKILL.md` (quantitative standards: sizes, spacing, touch targets) with **qualitative design judgment** (color strategy, rhythm, anti-patterns, AI-slop detection).

**Priority hierarchy:**
1. **Impeccable absolute bans** — never violated
2. **UI_UX_SKILL accessibility rules** — WCAG compliance
3. **Impeccable design laws** — qualitative craft
4. **UI_UX_SKILL spacing/sizing standards** — quantitative consistency
