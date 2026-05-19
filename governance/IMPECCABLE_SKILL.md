# Impeccable — Frontend Design Skill

> Production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

**Status:** Installed. Reference `.md` files pending from user.  
**Register:** `brand` (Ciclo17 landing = marketing surface, design IS the product)

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
   - "sustainability → dark + green accent" ← this IS Ciclo17's current reflex
   - Rework scene sentence and color strategy until answer isn't obvious from domain
   
2. **Second-order:** Can someone guess aesthetic family from category + anti-references?
   - "eco-tech that's not green → purple + editorial" ← also predictable
   - Rework until BOTH answers are non-obvious

---

## Ciclo17 Audit Against Impeccable Laws

### Current Violations

| # | Law | Violation | Location | Severity |
|---|-----|-----------|----------|----------|
| V1 | Glassmorphism ban | Navbar uses `backdrop-filter: blur(8.8px)` decoratively | `LandingNav.svelte` | ⚠️ Review |
| V2 | Identical card grids | PainPoints: 3 identical cards (icon + number + title + footer) | `LandingPainPoints.svelte` | 🔴 Rewrite |
| V3 | Identical card grids | Seguridad: 4 identical cards (icon + title + desc) | `LandingSeguridad.svelte` | 🔴 Rewrite |
| V4 | Pure black/white | `#000` not used but `white` keyword used extensively | `tokens.css`, all components | 🟡 Tint |
| V5 | Flat spacing | Same `80px` / `100px` vertical padding on every section | All sections | 🟡 Vary |
| V6 | Category reflex | "Sustainability" → dark bg + green accent is the obvious AI-reflex | `tokens.css` palette | ⚠️ Rethink |
| V7 | Modal-first | Quote form is a modal (now a wizard, better, but still modal) | `LandingQuoteForm.svelte` | ⚠️ Consider inline |
| V8 | Motion curves | Using `ease` instead of exponential easing | Multiple | 🟡 Upgrade |
| V9 | Bounce/elastic | None found ✅ | — | ✅ |
| V10 | Em dashes | None found ✅ | — | ✅ |
| V11 | Gradient text | None found ✅ | — | ✅ |
| V12 | Side-stripe borders | None found ✅ | — | ✅ |

### Color Strategy Assessment

**Current:** `Committed` — purple (`#d790f0`) carries ~30% of interactive surfaces.  
**Analysis:** Correct strategy for a brand landing page. However:
- The green accent (`#d6f47a`) functions as a second committed color, making this closer to `Full palette`
- Should formalize: purple = interactive/CTA, green = data/eco/accent, pastel variants = cards

### Scene Sentence (Theme Justification)

> "A marketing director evaluating agency websites on their MacBook during a workday, deciding which firm to hire for their company's web redesign. They want to feel confident the agency is modern and technically capable."

This forces **dark theme** (signals technical capability, premium positioning) but raises the question: does it force the green-on-dark eco palette? Not necessarily. The scene is about confidence and capability, not sustainability. The sustainability angle is content, not chrome.

### Register

**Brand register** — the landing page IS the product. Design must carry the brand story, not merely serve it.

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
