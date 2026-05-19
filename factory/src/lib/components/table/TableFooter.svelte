<script lang="ts">
	/**
	 * @component TableFooter
	 * @description Footer for stats and pagination.
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
		...fabricaAttrs('table-footer'),
		class: `table-card__footer ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<footer {...attrs}>
		{#if children}{@render children()}{/if}
	</footer>
{/if}

<style>
	.table-card__footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border-light);
	}
</style>
