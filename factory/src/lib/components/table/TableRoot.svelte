<script lang="ts">
	/**
	 * @component TableRoot
	 * @description Main card container for the table organism.
	 */
	import type { WithChild, TableRootProps } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		id,
		class: className,
		...rest
	}: WithChild<TableRootProps> = $props();

	const attrs = $derived({
		...fabricaAttrs('table-card'),
		id,
		class: `table-card ${className ?? ''}`.trim(),
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
	.table-card {
		background: var(--color-neutral-bg);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-md);
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}
</style>
