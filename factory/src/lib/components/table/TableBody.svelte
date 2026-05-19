<script lang="ts">
	/**
	 * @component TableBody
	 * @description Wrapper for the <table> element.
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
		...fabricaAttrs('table-body'),
		class: `table-container ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<div {...attrs}>
		<table class="data-table">
			{#if children}{@render children()}{/if}
		</table>
	</div>
{/if}

<style>
	.table-container {
		overflow-x: auto;
	}

	.data-table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
		font-size: var(--text-sm);
	}

	:global(.data-table th) {
		padding: var(--space-4);
		border-bottom: 1px solid var(--color-border-light);
		color: var(--color-text-muted);
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
	}

	:global(.data-table td) {
		padding: var(--space-4);
		border-bottom: 1px solid var(--color-border-light);
		color: var(--color-text-primary);
	}
</style>
