# RULES_SVELTE5.md — Global Engineering Rules (Runes & Snippets)

> **Status:** Active | **Domain:** GLOBAL GOVERNANCE

These rules apply to ALL agents writing Svelte code, regardless of phase or domain.

---

## Svelte 5 Mandate

The compiler is configured with `compilerOptions: { runes: true }`. This means:
- ✅ **Svelte 5 syntax is the ONLY permitted syntax.**
- ❌ **Svelte 4 syntax will BREAK the build.**

---

## Required Patterns

### 1. Props — `$props()` with Destructuring
```svelte
<script lang="ts">
  let {
    title,
    description = "Default",
    children,
    ...rest
  }: {
    title: string;
    description?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>
```

### 2. Reactivity — `$state` and `$derived`
```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
```

### 3. Two-Way Binding — `$bindable`
```svelte
<script lang="ts">
  let { open = $bindable(false) } = $props();
</script>
```

### 4. Content Projection — Snippets (NOT Slots)
```svelte
<!-- Parent -->
<MyComponent>
  {#snippet content()}
    <p>Projected content</p>
  {/snippet}
</MyComponent>

<!-- MyComponent.svelte -->
<script lang="ts">
  let { content }: { content: import('svelte').Snippet } = $props();
</script>
{@render content()}
```

### 5. Event Handling — Callback Props (NOT Directives)
```svelte
<!-- ✅ Correct -->
<button onclick={handleClick}>Click</button>

<!-- ❌ PROHIBITED -->
<button on:click={handleClick}>Click</button>
```

---

## Prohibited Syntax (Build-Breaking)

| Svelte 4 Pattern | Svelte 5 Replacement | Severity |
|:---|:---|:---:|
| `export let prop` | `let { prop } = $props()` | 🔴 FATAL |
| `$: reactive` | `$derived()` or `$effect()` | 🔴 FATAL |
| `<slot />` | `{@render children()}` | 🔴 FATAL |
| `<slot name="x">` | `{#snippet x()}...{/snippet}` | 🔴 FATAL |
| `on:click` | `onclick` | 🟡 WARNING |
| `createEventDispatcher` | Callback function props | 🔴 FATAL |

---

## Styling Rules

1. **NEVER hardcode hex colors** inside `<style>` blocks. Use `var(--token-name)`.
2. **ALWAYS use CSS Custom Properties** from `tokens.css` for spacing, colors, radii.
3. **Scoped styles by default.** Use `:global()` only when absolutely necessary.
4. **Data attributes** (`data-state`, `data-variant`) are preferred over conditional class strings.

---

## Component Structure Template (Compound)

```svelte
<script lang="ts">
  /**
   * @component ComponentRoot
   * @description Main container for the Component compound.
   */
  import type { WithChild, ComponentProps } from '../_shared/types';
  import { fabricaAttrs } from '../_shared/attrs';

  let {
    children,
    child,
    variant = 'default',
    class: className,
    ...rest
  }: WithChild<ComponentProps> = $props();

  const attrs = $derived({
    ...fabricaAttrs('component', { variant }),
    class: `component ${className ?? ''}`.trim(),
    ...rest
  });
</script>

{#if child}
  {@render child({ props: attrs })}
{:else}
  <div {...attrs}>
    {#if children}{@render children()}{/if}
  </div>
{/if}

<style>
  .component {
    padding: var(--space-4);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
  }

  :global([data-fabrica-component][data-variant="primary"]) {
    background: var(--color-primary);
    color: var(--color-white);
  }
</style>
```

### index.ts Template
```typescript
import Root from './ComponentRoot.svelte';
import Sub from './ComponentSub.svelte';

export { Root, Sub, Root as Component };
```
