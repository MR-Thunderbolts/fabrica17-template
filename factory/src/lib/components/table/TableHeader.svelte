<script lang="ts">
	/**
	 * @component TableHeader
	 * @description Header area for filters, tabs, and actions.
	 */
	import type { WithChild } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		class: className,
		...rest
	}: WithChild = $props();

	const attrs = $derived({
		...fabricaAttrs('table-header'),
		class: `table-card__header ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<header {...attrs}>
		{#if children}{@render children()}{/if}
	</header>
{/if}

<style>
	.table-card__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-4);
	}

	@media (max-width: 768px) {
		.table-card__header {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
