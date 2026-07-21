# FÁBRICA17 — STATE PLAYBOOK (Context Infrastructure)

> **Generated:** 2026-04-27 | **Phase:** Post-Compound Migration | **Architecture:** Multi-Agent (3-Domain)
> **Curador:** Antigravity Agent | **Governance Version:** 1.0

---

## 1. ARQUITECTURA & STACK TECNOLÓGICO

### Tech Stack (Innegociable)

| Layer | Technology | Version | Lock Rule |
|:---|:---|:---|:---|
| Framework | SvelteKit | 2.x | SSG-first (`adapter-static`) |
| Language | Svelte 5 | Runes-only | `compilerOptions.runes: true` |
| Runtime | Bun | latest | Replaces Node.js |
| Bundler | Vite | 6.x | Via `@sveltejs/vite-plugin-svelte` |
| Icons | unplugin-icons | 0.21.x | SVG discretos, zero CDN |
| Styling | Vanilla CSS | — | Custom Properties + data-attributes |
| Tailwind | **PROHIBIDO** | — | — |
| External UI | **PROHIBIDO** | — | No Bits UI/Melt UI runtime deps |

### Svelte 5 — Reglas de Ejecución

```
MANDATORIO                        PROHIBIDO (Svelte 4 Legacy)
─────────────────────────────     ─────────────────────────────
$state()                          let count = 0 (reactive)
$derived()                        $: derivedValue
$props()                          export let prop
$bindable()                       createEventDispatcher
$effect()                         afterUpdate / beforeUpdate
{#snippet name()}                 <slot name="x">
{@render name()}                  <slot />
onclick={handler}                 on:click={handler}
```

### Green Coding Quality Gates

| Metric | Budget | Grade A+ | Grade A |
|:---|:---|:---|:---|
| Carbon per page | ≤ 0.186g | ≤ 0.095g | ≤ 0.186g |
| JS Bundle (total) | < 150KB | < 80KB | < 150KB |
| DOM Nodes | < 1500 | < 800 | < 1500 |
| TTI (Time to Interactive) | < 2.5s | < 1.5s | < 2.5s |
| Rendering | SSG default | SSG | SSG |
| Images | WebP/AVIF | AVIF preferred | WebP accepted |
| Fonts | Self-hosted, subset | woff2 subset | woff2 full |
| CDN | **Cero** | — | — |

### 3-Domain Architecture

```
/
├── /governance/           # INMUTABLE durante sesión. Reglas universales.
│   ├── AGENTS.md          # Topología de agentes + Quality Gates
│   ├── WORKFLOW.md        # Factory Expansion vs. Client Assembly
│   ├── RULES_SVELTE5.md   # Svelte 5 enforcement
│   ├── GREEN_CODING.md    # Carbon budgets + auditoría
│   ├── ERROR_PATTERNS.md  # Playbook de fallos (Curador)
│   ├── BEST_PRACTICES.md  # Patrones A+ (éxitos)
│   ├── SETUP.md           # Scaffolding protocol
│   ├── STYLE.md           # Nomenclatura Atomic Design
│   ├── TESTING.md         # Pre-flight checklist
│   ├── GIT.md             # Conventional Commits
│   ├── TOKEN_WORKFLOW.md  # Figma MCP parity check
│   └── DESIGN.md          # Especificación de tokens base
│
├── /factory/              # SOLO LECTURA para ensambladores. Tier 2 para cambios.
│   ├── /src/lib/components/   # 11 compound namespaces + 2 direct exports
│   │   ├── _shared/           # types.ts + attrs.ts
│   │   ├── bento/             # Grid + Item
│   │   ├── button/            # ButtonRoot
│   │   ├── card/              # Root + Modal
│   │   ├── carousel/          # Root + Header + Track
│   │   ├── dialog/            # Root + Trigger + Overlay + Content + Close
│   │   ├── footer/            # Root + Brand + Column
│   │   ├── hero/              # Root + Content + Visual
│   │   ├── navbar/            # Root + Brand + Links + Actions
│   │   ├── section/           # SectionRoot
│   │   ├── table/             # Root + Header + Body + Footer
│   │   ├── testimonials/      # TestimonialsRoot
│   │   ├── Dotted.Background.svelte  (non-compound)
│   │   ├── Terminal.Mockup.svelte    (non-compound)
│   │   └── index.ts           # Barrel export
│   ├── /scripts/              # sync-tokens.ts
│   ├── /templates/            # Template.ClientAssembly.svelte
│   └── /assets/               # SVG iconos locales
│
└── /clients/              # ESCRITURA LIBRE (Tier 1). Un folder por cliente.
    └── /_template/
        ├── PROJECT_STATUS.json
        ├── DESIGN.md
        └── /routes/
```

### Gobernanza en 3 Niveles

| Tier | Scope | Regla |
|:---|:---|:---|
| Tier 1 — Autónomo | `/clients/` | Agentes crean/editan sin aprobación |
| Tier 2 — Soft Approval | `/factory/` | Cambios requieren diff + CONFIRM humano |
| Tier 3 — Strong Approval | `main` branch | Merge requiere firma humana |

---

## 2. MAPEO CRUZADO: DISEÑO → CÓDIGO (Semantic Match)

### Protocolo de Extracción de Tokens

```
PASO 1: mcp_FigmaDesktop_get_variable_defs(nodeId: "root-frame")
        │
        ▼
PASO 2: Output → figma-tokens.json
        {
          "general/primary": "#1a1a1a",
          "general/foreground": "#fafafa",
          "general/muted-foreground": "#a1a1aa",
          "rounded-lg": "12",
          "font definitions/font-family-body": "Inter"
        }
        │
        ▼
PASO 3: bun run factory/scripts/sync-tokens.ts
        │  Mapea tokens Figma → CSS Custom Properties
        │  "general/primary" → --color-primary
        │  "rounded-lg"      → --radius-md
        │
        ▼
PASO 4: Output → cliente/tokens.css
        :root {
          --color-primary: #1a1a1a;
          --color-text-primary: #fafafa;
          --color-text-muted: #a1a1aa;
          --radius-md: 12px;
          --font-body: 'Inter', sans-serif;
        }
```

### Regla de Ensamblaje Estricto

```
1. LEER Figma AST (via mcp_FigmaDesktop_get_design_context)
2. MAPEAR cada capa Figma a un Golden Component:
   - Figma "Navbar.Standard" → import { Navbar } from '$factory/components'
   - Figma "Hero.Split"      → import { Hero } from '$factory/components'
3. EXTRAER props del diseño:
   - headline = Figma text node content
   - image = Figma image fill URL
4. ENSAMBLAR en +page.svelte usando Template.ClientAssembly
```

**REGLA DE ORO:** Si el componente existe en `/factory/`, ESTÁ PROHIBIDO inventar HTML/CSS.
El agente DEBE importar y propagar props. La única excepción es cuando Scout confirma un gap.

### Inyección de Estilos (CSS Nativo — Zero Tailwind)

```svelte
<!-- Los componentes son DALTÓNICOS. Solo consumen variables CSS. -->
<button data-fabrica-button data-variant="primary">
  Click
</button>

<!-- El styling se resuelve via data attributes en el componente: -->
[data-fabrica-button][data-variant="primary"] {
  background: var(--color-primary);   /* ← viene de cliente/tokens.css */
  color: var(--color-white);
}
```

---

## 3. ÍNDICE DE COMPONENTES DE ORO (API MAP)

### Compound Components (Namespace Imports)

#### `Button` — Atom
```typescript
import { Button } from '$factory/components/button';
// Props: variant?, type?, disabled?, onclick?, ariaLabel?, class?
// Patterns: WithChild, data-fabrica-button, data-variant
```
| Prop | Type | Default |
|:---|:---|:---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline'` | `'primary'` |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` |
| `disabled` | `boolean` | `false` |
| `onclick` | `(e: MouseEvent) => void` | — |
| `ariaLabel` | `string` | — |

#### `Bento` — Molecule
```typescript
import * as Bento from '$factory/components/bento';
// <Bento.Grid columns={4}><Bento.Item title="X" /></Bento.Grid>
```
| Sub | Prop | Type | Default |
|:---|:---|:---|:---|
| `Grid` | `columns` | `number` | `4` |
| `Item` | `title` | `string` | **required** |
| `Item` | `description` | `string` | — |
| `Item` | `icon` | `string` | — |

#### `Dialog` — Molecule (replaces Modal)
```typescript
import * as Dialog from '$factory/components/dialog';
// <Dialog.Root bind:open>
//   <Dialog.Trigger>Open</Dialog.Trigger>
//   <Dialog.Overlay />
//   <Dialog.Content><Dialog.Close /></Dialog.Content>
// </Dialog.Root>
```
| Sub | Prop | Type | Default |
|:---|:---|:---|:---|
| `Root` | `open` | `$bindable(boolean)` | `false` |
| `Trigger` | — | WithChild | — |
| `Content` | — | `children` | — |
| `Close` | — | WithChild | default `×` |

#### `Section` — Organism
```typescript
import { Section } from '$factory/components/section';
```
| Prop | Type | Default |
|:---|:---|:---|
| `padding` | `'small' \| 'medium' \| 'large' \| 'none'` | `'large'` |
| `background` | `'default' \| 'warm' \| 'primary' \| 'muted'` | `'default'` |
| `fullWidth` | `boolean` | `false` |
| `content` | `Snippet` | **required** |
| `sidebar` | `Snippet` | — |

#### `Hero` — Organism
```typescript
import * as Hero from '$factory/components/hero';
// <Hero.Root><Hero.Content headline="X" /><Hero.Visual image="url" /></Hero.Root>
```
#### Atoms — Primitives
Pure functional building blocks with zero business logic.

| Component | Props | Description |
|:---|:---|:---|
| `Button` | `variant`, `disabled` | Headless button primitive |
| `Heading` | `level`, `badge`, `subheading` | Universal text primitive |
| `Icon` | `icon`, `size` | Iconify npm sets (mynaui default) |
| `Media` | `src`, `aspect`, `fit` | Universal image/video primitive |
| `Input` | `type`, `placeholder`, `error` | Headless form primitive |
| `Badge` | `variant` | Inline tag/label |
| `Avatar` | `src`, `size`, `fallback` | User representation |
| `Divider` | `orientation` | Structural separator |
| `Link` | `href`, `active`, `underline` | Semantic anchor |
| `Section.Root` | `padding`, `background` | Layout primitive |

#### Molecules — Compounds
Feature-maximal sets composed from atoms.

| Component | Feature Focus |
|:---|:---|
| `Navbar` | Root, Brand, Links, Actions (Maximal Feature Set) |
| `Carousel` | Root, Header, Track (Scroll Context) |
| `Card` | Headless container (Variant Registry) |
| `Dialog` | State-driven overlay context |
| `Bento` | Grid-based layout container |

> [!IMPORTANT]
> **Organisms** (e.g. Hero, Footer, ProductCard) are NO LONGER in the library. Agents MUST compose them inline using Atoms and Molecules during the assembly phase.
import * as Table from '$factory/components/table';
// <Table.Root><Table.Header>...</Table.Header><Table.Body>...</Table.Body><Table.Footer>...</Table.Footer></Table.Root>
```
| Sub | Role |
|:---|:---|
| `Root` | Card wrapper |
| `Header` | Filters + actions |
| `Body` | Wraps `<table>` with scroll |
| `Footer` | Pagination + stats |

#### `Testimonials` — Organism
```typescript
import { Testimonials } from '$factory/components/testimonials';
```
| Prop | Type | Default |
|:---|:---|:---|
| `testimonials` | `Array<{quote,name,designation,src}>` | **required** |
| `activeIndex` | `$bindable(number)` | `0` |

#### `Card` — Organism
```typescript
import * as Card from '$factory/components/card';
// <Card.Root {card} onclick={toggle} />
// <Card.Modal {card} bind:open>...content...</Card.Modal>
```
| Sub | Prop | Type |
|:---|:---|:---|
| `Root` | `card` | `{category,title,src}` **required** |
| `Modal` | `card` | `{category,title,src}` **required** |
| `Modal` | `open` | `$bindable(boolean)` |

#### `Carousel` — Organism
```typescript
import * as Carousel from '$factory/components/carousel';
// <Carousel.Root><Carousel.Header title="X" {onScroll} /><Carousel.Track>...</Carousel.Track></Carousel.Root>
```
| Sub | Prop | Type |
|:---|:---|:---|
| `Header` | `title` | `string` |
| `Header` | `onScroll` | `(dir: 'left'\|'right') => void` |
| `Track` | `scrollContainer` | `$bindable(HTMLDivElement)` |

### Non-Compound (Direct Exports)

| Component | Import | Props |
|:---|:---|:---|
| `DottedBackground` | `import { DottedBackground } from '...'` | None (canvas animation, eco-mode aware) |
| `TerminalMockup` | `import { TerminalMockup } from '...'` | `lines: string[]` |

---

## 4. PLAYBOOK DE APRENDIZAJE Y ERRORES (ACE Framework)

### A — Aciertos (Patrones A+)

| # | Pattern | Source | Impact |
|:---|:---|:---|:---|
| A1 | **Token-First Styling** — `var(--space-6)` never `24px` | Hero.Split audit | Instant brand swap via `cliente/tokens.css` |
| A2 | **Section.Master as Layout Engine** — `data-padding` + `data-bg` | Page assembly | Eliminates ad-hoc `<section>` chaos |
| A3 | **Snippet > Slot (Always)** — `{#snippet content()}` | Modal refactor | Type-safety, no phantom slot bug |
| A4 | **$bindable for Interactive State** — controlled/uncontrolled | Modal.isOpen | Both patterns from same component |
| A5 | **Data Attributes for State** — `data-variant="primary"` | Button refactor | Clean DevTools, decoupled styling |
| A6 | **Figma Token Parity Check** — `get_variable_defs` before sync | Token sync | Prevents stale token injection |
| A7 | **fabricaAttrs() builder** — centralized data-fabrica-* generation | Sprint 0 | Consistent attribute API across all compounds |
| A8 | **WithChild renderless override** — `child` snippet pattern | Sprint 1 | Full element control for consumers |
| A9 | **Shell-Wrapper Carousel** — decouple interaction from scroll | Run 3 | Fixes button clipping while keeping scroll containment |
| A10 | **Physical Flex Spacers** — `width: var(--space-X)` at track ends | Run 3 | Guaranteed scroll clearance on all browsers/viewports |
| A11 | **Rieles de Acero ejecutables** — governance como gates (`factory/scripts/architecture-check.ts`, 5 gates: Svelte4/hex/imports/Tailwind/JS-budget), integrados a `bun run check` | Ing. inversa Instatic (`src/__tests__/architecture/`) | Una regla que no falla el build es una sugerencia. C4/C5 pasan de errores recurrentes a imposibilidades |
| A12 | **Mapeo de tokens con fuente única** — `factory/scripts/token-mapping.ts` compartido por sync y verify | Lección anti-desync de Instatic | Dos copias de la misma verdad terminan divergiendo |
| A13 | **Estructura encapsulada** — tooling en `factory/scripts/`, skills de agente en `governance/skills/`, playbook en `governance/` | Retro-portado de Landing+Calculadora (2026-07-10) | `governance/` deja de mezclar 18 reglas con 37 skills; el desacople de lanzamiento pasa a ser un solo `rm -rf factory/` |

### C — Correcciones (Errores Resueltos)

| # | Error | Síntoma | Causa Raíz | Fix |
|:---|:---|:---|:---|:---|
| C1 | **Root Escape** | `Failed to load url` | Rutas relativas frágiles | Use `$root` alias |
| C2 | **Horizontal Bleed** | Scrollbar horizontal | `100vw` sin `overflow-x: hidden` | Parent `overflow-x: hidden` |
| C3 | **Doble Contención** | Título desalineado | Carousel dentro de SectionMaster | `fullWidth={true}` |
| C4 | **Ghost Token** | Colores grises inesperados | Token no mapeado en sync | Run `bun run tokens:sync` |
| C5 | **Hidden Svelte 4** | Deprecation warnings | Legacy `$:` reactivity | Enforce runes in config |
| C6 | **Snippet Balance** | `close element not open` | `{/snippet}` olvidado | Pre-check snippet pairs |
| C7 | **Native Script** | `Unexpected token` | `<script>` tag deleted by editor | Validate open/close tags |
| C8 | **MCP CamelCase** | Server not found | Spaces in MCP server name | Use `FigmaDesktop` not `Figma Desktop` |
| C9 | **Figma Asset Ephemeral** | Broken image/logo | `localhost:3845` URLs expire when Figma Desktop closes | Inline SVGs or use CDN/static assets. NEVER commit localhost URLs |
| C10 | **Snippet vs Children** | Logo missing from Navbar | `{#snippet brand()}` passed to `<Navbar.Root>` but Root only renders `children`, not named snippets | Place `<Navbar.Brand>` directly as a child of `<Navbar.Root>`, not inside a named snippet |
| C11 | **Carousel overflow-x:hidden clips floats** | Floating arrow buttons invisible | `overflow-x: hidden` on wrapper clips absolutely-positioned elements | Set wrapper to `overflow: visible`; confine scrolling to `.carousel-container` only |
| C12 | **Flex Track Padding unreliable** | Last card clipped at scroll end | `padding-right` on a flex `width: max-content` container is sometimes ignored by browsers for scroll extent | Use physical **spacer `<div>`** elements at track start/end instead of padding |
| C13 | **flex:1 in fixed-width track** | Cards shrink/stretch | `flex: 1 0 0` on ProductCard stretches card to fill parent scroll track | Use `flex: 0 0 auto` + fixed `width` for carousel cards |
| C14 | **scroll-snap-type:mandatory on mobile** | Card appears cut off / wrong scroll position | Mandatory snapping locks to nearest snap point; if spacer is a snap target, card is partially hidden | Remove `scroll-snap-type` from contained carousels, or only apply to specific child snap points |

### E — Evoluciones (Debt Consciente)

| # | Item | Status | Priority |
|:---|:---|:---|:---|
| E1 | Legacy flat files coexist with compound folders | Planned cleanup | After route migration |
| E2 | NavbarLinks imports `$app/stores` (SvelteKit coupling) | **RESOLVED** (verificado 2 JUL 2026 — import ya no existe) | — |
| E3 | NavbarActions imports `$root/utils/settings.svelte` | **RESOLVED** (verificado 2 JUL 2026 — import ya no existe) | — |
| E4 | `verify-tokens.ts` automated diff script | **RESOLVED** (2 JUL 2026 — `bun run tokens:verify`, gate en `bun run check`; detecta ghosts C4, drift y orphans) | — |
| E5 | `Card.Modal` uses Dialog internally — circular potential | Monitored | Low |
| E6 | Carousel floating arrows rely on `position: absolute` + negative offset — fragile on narrow viewports | Known debt | Add `position: relative` wrapper with explicit overflow budget |
| E7 | ProductCard `width: 280px` hardcoded — should be a token `--card-width` | Planned | Low |
| E8 | CarouselHeader imports `$root/utils/glow-action` (coupling factory→utils) | Known debt — whitelisted en architecture-check | Extract to action prop |
| E9 | Dotted.Background imports `$root/utils/settings.svelte` (coupling factory→utils) | Known debt — whitelisted en architecture-check | Extract to `ecoMode` prop |

---

## 5. FLUJO OPERATIVO ACTUAL (Self-Healing Workflow)

### 4-Step Execution Loop

```
┌─────────────────────────────────────────────────────────┐
│ PASO 1: LECTURA (Scout Agent)                           │
│                                                         │
│ • mcp_FigmaDesktop_get_design_context(nodeId)           │
│ • mcp_FigmaDesktop_get_variable_defs(nodeId)            │
│ • Compare Figma layers → Factory index.ts               │
│ • Output: Component Manifest + Gaps list                │
│ • Write: PROJECT_STATUS.json.factory_coverage            │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│ PASO 2: EXTRACCIÓN (Design Agent)                       │
│                                                         │
│ • Map Figma variable defs → figma-tokens.json           │
│ • Run sync-tokens.ts → cliente/tokens.css                 │
│ • Populate DESIGN.md with [PENDING] → [RESOLVED]        │
│ • Output: Brand CSS + token audit                       │
│ • Write: PROJECT_STATUS.json.completed_tasks[]           │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│ PASO 3: ENSAMBLAJE (Developer Agent)                    │
│                                                         │
│ • Import compound components from factory/index.ts      │
│ • Map Figma props → component props                     │
│ • Generate +page.svelte in clients/<name>/routes/       │
│ • STRICT: No HTML invention. Assembly only.             │
│ • Write: Route files + updated PROJECT_STATUS.json       │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│ PASO 4: VALIDACIÓN + SELF-HEALING (QA Agent)            │
│                                                         │
│ • Run: bun run check (svelte-check + tsc)               │
│ • If FAIL:                                              │
│   ├─ Analyze error output                               │
│   ├─ Apply fix                                          │
│   ├─ Re-run bun run check                               │
│   └─ MAX 3 iterations → then ESCALATE to human (Tier 3) │
│ • If PASS:                                              │
│   ├─ Run Green Audit (carbon + DOM + bundle)            │
│   ├─ Grade A/A+ → Curator writes BEST_PRACTICES.md      │
│   └─ Failures → Curator writes ERROR_PATTERNS.md        │
│ • Output: audit_results in PROJECT_STATUS.json           │
└─────────────────┬───────────────────────────────────────┘
                  │
### COMPONENT ADAPTATION PROTOCOL (Figma → Library)

To ensure high fidelity without polluting the library with client-specific hacks, follow this decision tree:

1.  **Headless by Default**: Components must not enforce opinionated styles (like pill backgrounds or specific shadows) unless explicitly requested via a variant.
2.  **Structural Mapping**:
    *   **Exact Match**: Use existing component as-is.
    *   **Same Structure, Different Look**: Do **NOT** overwrite the base CSS. Add a `variant` prop (e.g., `variant="flat" | "pill"`) and implement the new style using `[data-variant="..."]` selectors.
    *   **New Pattern**: If no component fits the structure, ASK the user: *"Permission to create new component `factory/.../X.svelte`?"*
3.  **Snippet Injection**: Prefer Snippets over Slots for branding (e.g., `icon`, `brand`) to allow complex Figma SVGs to be injected without modifying component internals.
4.  **Green Coding Check**: New components or variants must be audited for DOM node count and CSS weight.

---

## PASO 5: REPORTE DE ENTREGA (Designer Handoff)
```

### Self-Healing Protocol

```
if (bun_run_check === FAIL) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    analyze(error_output);
    apply_fix();
    if (bun_run_check === PASS) break;
  }
  if (still_failing) {
    escalate("TIER_3_HUMAN_REQUIRED");
    curator.log(ERROR_PATTERNS_MD, { error, attempts: 3 });
  }
}
```

### Agent Communication Protocol (A2A Handoffs)

```
Scout → Orchestrator:
  "Gap analysis complete. {n} components missing: [{list}].
   Recommend: Factory Expansion / Assembly Ready."

Design → Developer:
  "Visual domain finalized. Tokens in DESIGN.md L{start}-L{end}.
   Brand CSS generated at cliente/tokens.css.
   Cleared for assembly."

Developer → QA:
  "Assembly complete at /clients/{name}/routes/+page.svelte.
   {n} components imported. 0 new dependencies.
   Awaiting Green Audit."

QA → Curator:
  "Audit {PASS|FAIL}. Grade {grade} ({carbon}g CO₂).
   {Extracting patterns | Logging errors}."
```

---

## 6. COMPOUND COMPONENT ARCHITECTURE (Patterns Reference)

### Pattern A: Namespace Folder
```
component-name/
├── ComponentRoot.svelte
├── ComponentSub.svelte
└── index.ts  → export { Root, Sub, Root as ComponentName }
```

### Pattern B: WithChild (Renderless Override)
```svelte
let { children, child, ...rest }: WithChild<Props> = $props();
{#if child}
  {@render child({ props: rootProps })}
{:else}
  <element {...rootProps}>{@render children?.()}</element>
{/if}
```

### Pattern C: fabricaAttrs Builder
```typescript
import { fabricaAttrs } from '../_shared/attrs';
const attrs = fabricaAttrs('button', { variant, disabled });
// → { 'data-fabrica-button': true, 'data-variant': 'primary' }
```

### Pattern D: $bindable for State
```svelte
let { open = $bindable(false) } = $props();
// Parent: <Dialog.Root bind:open={myState}>
// Standalone: <Dialog.Root> (self-managed)
```

### Pattern E: Context for Compound State
```svelte
// Root: setContext(KEY, { get open() { return open; }, toggle, close })
// Sub: const ctx = getContext(KEY);
```

---

## 7. MIGRACIÓN 2026-07-20 — GRAYSCALE BASELINE & PURGA DE RESIDUOS DE CLIENTE

> **Curador:** Claude (sesión de limpieza post-desacople) | **Estado:** Aplicado y validado (`bun run check` + `bun run build` en verde)

### Qué cambió

1. **Sistema de diseño grayscale por defecto** — `utils/tokens.css` reescrito implementando `DESIGN.md`: primitivas `--color-gray-50…950` (hex + OKLCH acromático) → capa semántica completa → componentes. Temas light (default) / dark vía `data-theme`. Se cerraron ~15 tokens fantasma que los componentes consumían sin definición (`--radius-md`, `--text-sm`, `--transition-fast`, `--shadow-sm`, `--color-surface-base`, `--hover-opacity`, etc.).
2. **Un solo archivo de identidad** — eliminado `utils/client-brand.css` (+ template). La marca del cliente vive SOLO en `cliente/tokens.css` como overrides semánticos; `sync-tokens.ts` escribe dentro de un bloque delimitado (FIGMA SYNC START/END) sin pisar overrides manuales. Cadena de imports: `src/app.css` → `utils/app.css` (baseline+reset) → `cliente/tokens.css` (overrides, gana cascada).
3. **Purga de residuos del proyecto Ciclo17 (landing)** — logo, paleta (eucalipto/violeta/lima), tokens audit-*, y menciones en docs. `PageLoadingOverlay` tenía un import roto a `Logo-Ciclo17.svg` (borrado por `clean:template`) que impedía el build — reescrito genérico. El nombre **Fábrica17 se conserva** (Ciclo17 es la agencia).
4. **Iconos 100% npm** — eliminados los ~1500 SVGs Phosphor versionados (`factory/assets/icons/`, 35MB) y las `customCollections` de Vite. Sets autorizados: MynaUI (default), Lucide, **Material Symbols** (nuevo). Otras colecciones Iconify permitidas por requerimiento de cliente.
5. **package.json template-first** — removidos los metadatos de librería empaquetable (`exports`, `files`, `svelte`, `peerDependencies`, `build:lib`, `@sveltejs/package`). Si en el futuro se publica como paquete, restaurar desde git history.
6. **Nomenclatura de tokens unificada en componentes** — `--radius-base`→`--radius-md`, `--radius-badge`→`--radius-sm`, `--color-neutral-warm`→`--color-surface-muted`, `--color-error`→`--color-danger`.
7. **`clean-template.ts` generalizado** — allowlist del kit base (antes: lista hardcodeada de archivos de la landing) + reset de `cliente/tokens.css` al estado grayscale.

### Reglas derivadas (vigentes)

- **R-GRAY-1:** El baseline es acromático. Ningún componente de `factory/` puede introducir color con matiz; el matiz entra solo por overrides del cliente o tokens de estado.
- **R-GRAY-2:** Todo token consumido por un componente DEBE existir en `utils/tokens.css`. Un `var(--x, fallback)` cuyo `--x` no está definido en el baseline es un bug (ghost token).
- **R-ICON-1:** Cero SVGs de colecciones versionados en el repo; iconos siempre vía `@iconify-json/*`.

### Deuda conocida post-migración

- E8/E9 siguen vigentes (imports de `$root/utils` en CarouselHeader y Dotted.Background — whitelisted en architecture-check).
- `verify-tokens.ts` valida paridad Figma↔CSS pero aún no valida coherencia interna consumido↔definido (candidato a gate futuro para hacer cumplir R-GRAY-2).
- Secciones §1-§6 de este playbook anteriores a esta migración pueden referir rutas/estados previos; ante conflicto, manda esta sección y `DESIGN.md`.

---

## 8. GOBERNANZA 2026-07-20 (cont.) — ANTI-DERIVA + PROTOCOLO DE BRIEF + REGLA OKLCH

> **Curador:** Claude | **Estado:** Aplicado y validado (`bun run check` en verde, 6 gates)
> Origen: análisis del reporte `WORKFLOW_NOTES.md` (proyecto GreenMip v2, ver §7) + feedback del equipo sobre OKLCH.

### Qué se agregó

1. **`DRIFT_LOG.md`** (nuevo) — registro obligatorio de deriva fábrica↔implementación: no-uso de un componente existente, override local en vez de variante, o inconsistencia entre agentes. Umbral de curación: 2ª ocurrencia sobre el mismo componente obliga a proponer variante (Tier 2) en vez de seguir tolerando el override.
2. **Regla "Variante-antes-que-Override"** en `AGENTS.md` — ante un componente que casi cubre el caso, la respuesta es extenderlo con variante, nunca bifurcarlo con CSS/HTML ad-hoc sin registrar la deriva.
3. **`BRIEF_PROTOCOL.md`** (nuevo) — formaliza el contrato de trabajo verificable observado en el proyecto de referencia: punto de brief con archivo+línea+valor actual+target+porqué+checklist de aceptación; reglas negativas explícitas; batch por archivo/componente; registro de ambigüedades automático post-batch (con falsos positivos marcados como tales); jerarquía de fuentes de verdad preguntada nunca asumida; docs de proceso efímeros pero con extracción previa a `DESIGN.md`/`ERROR_PATTERNS.md`; features complejos separan entender→comparar→ejecutar; commits atómicos por unidad, hechos por el agente al cierre.
4. **`TESTING.md` extendido** (§5-9): QA visual multi-breakpoint contra Figma + re-verificación con render limpio antes de aceptar "sigue mal"; QA de comportamiento con datos muestreados (`scrollY`, `getComputedStyle` en frames, no solo screenshots); jerarquía de fuentes de verdad; protocolo de borrado seguro de assets (contar referencias + smoke test 4xx/5xx); gate de SVGs de Figma.
5. **`architecture-check.ts` Gate 6** (nuevo, warning-only) — detecta SVGs en `cliente/`/`factory/` con `preserveAspectRatio="none"` + `width/height="100%"`, patrón que distorsiona en Chromium. Ver `ERROR_PATTERNS.md` #14.
6. **`ERROR_PATTERNS.md`** — #14 "FIGMA SVG EXPORT DISTORTION", #15 "SILENT DRIFT" (referencia cruzada a `DRIFT_LOG.md`).
7. **`GIT.md`** — regla de commits atómicos por unidad, hechos por el agente al cierre, mensaje reflejando el diff real (no una intención vieja).
8. **Regla de autoría OKLCH** (`OKLCH_CALIBRATION.md` + `DESIGN.md`) — confirmada por el equipo: **Figma no maneja OKLCH**. Hex es siempre el valor autoral/fuente-de-verdad en `:root` (lo que escribe `tokens:sync`); OKLCH es exclusivamente una capa `@supports` de progressive enhancement, nunca el único valor de un token. Ante duda, se omite el override OKLCH — nunca se omite el hex base.

### Explícitamente NO decidido todavía

- **Adopción de Bits UI (o cualquier librería headless externa)** — sigue bloqueada por el lock "External UI: PROHIBIDO" (§1 de este playbook). Pendiente confirmación del resto del equipo antes de accionar. No tocar ese lock sin luz verde explícita.
- **Tailwind/DaisyUI** — prohibición reconfirmada por el usuario, sigue vigente sin cambios.
