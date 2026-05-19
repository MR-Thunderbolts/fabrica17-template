# STYLE.md — Compound Component Architecture & Naming

> **Status:** Active | **Updated:** 2026-04-27 (Post-Compound Migration)

## 1. Component Architecture: Compound Namespace

All Golden Components reside in `factory/src/lib/components/` and use **folder-based compound namespaces**.

### Structure Convention
```
factory/src/lib/components/
├── <component-name>/
│   ├── <ComponentName>Root.svelte   # Main container
│   ├── <ComponentName>Sub.svelte    # Sub-component(s)
│   └── index.ts                     # Namespace barrel export
├── _shared/
│   ├── types.ts                     # All prop interfaces
│   └── attrs.ts                     # fabricaAttrs() builder
└── index.ts                         # Master barrel export
```

### `index.ts` Convention
```typescript
import Root from './ComponentRoot.svelte';
import Sub from './ComponentSub.svelte';

export { Root, Sub, Root as ComponentName };
```

### Consumer API
```svelte
import * as Dialog from '$factory/components/dialog';

<Dialog.Root bind:open>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Overlay />
  <Dialog.Content>
    <Dialog.Close />
  </Dialog.Content>
</Dialog.Root>
```

## 2. Naming Rules

### Folder Names
- **Lowercase, singular:** `button/`, `dialog/`, `hero/`, `navbar/`
- NO dot notation in folders. Dots are for legacy flat files only.

### File Names (inside folders)
- **PascalCase with component prefix:** `DialogRoot.svelte`, `NavbarBrand.svelte`
- Sub-components MUST be prefixed with the parent name.

### Non-Compound Components
- Decorative or single-purpose components MAY remain as flat files:
  - `Dotted.Background.svelte`, `Terminal.Mockup.svelte`

## 3. Atomic Design Hierarchy

| Level | Location | Examples |
|:---|:---|:---|
| **Atoms** | `button/` | Button |
| **Molecules** | `bento/`, `dialog/` | Bento.Grid + Item, Dialog compound |
| **Organisms** | `hero/`, `navbar/`, `footer/`, `table/`, `testimonials/`, `card/`, `carousel/`, `section/` | Full page sections |
| **Templates** | `factory/templates/` | Template.ClientAssembly |

## 4. Required Patterns for ALL New Components

1. **WithChild** — Every Root component MUST accept a `child` snippet for renderless override.
2. **fabricaAttrs()** — Every component MUST use `fabricaAttrs('name', state)` for data attributes.
3. **Typed Props** — Every component MUST have its prop interface in `_shared/types.ts`.
4. **$bindable** — Interactive state (open, active, value) MUST use `$bindable()`.

## 5. Prohibited

- ❌ `Card.svelte` as a flat file (must be `card/CardRoot.svelte`)
- ❌ Inline prop types (must be in `_shared/types.ts`)
- ❌ Class-based conditional styling (use `data-*` attributes)
- ❌ Direct `<slot>` usage (use Snippets)
- ❌ `~icons/mynaui/*` or ad-hoc raw SVGs (must import from `~icons/ph/*` collection)
