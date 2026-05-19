<script lang="ts">
	/**
	 * @component BentoRoot
	 * @description Grid container for Bento layout. Accepts BentoItem children.
	 */
	import type { WithChild, BentoGridProps } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		columns = 4,
		class: className,
		...rest
	}: WithChild<BentoGridProps> = $props();

	const attrs = $derived({
		...fabricaAttrs('bento-grid'),
		class: `bento-grid ${className ?? ''}`.trim(),
		style: `--bento-columns: ${columns}`,
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
	.bento-grid {
		display: grid;
		grid-template-columns: repeat(var(--bento-columns, 4), 1fr);
		grid-auto-rows: 200px;
		gap: var(--space-4);
		max-width: 1280px;
		margin: 0 auto;
		padding: var(--space-8);
	}

	@media (max-width: 1024px) {
		.bento-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.bento-grid {
			grid-template-columns: 1fr;
			grid-auto-rows: auto;
		}
	}

	/* Span utilities */
	:global([data-fabrica-bento-grid] .bento-col-2) { grid-column: span 2; }
	:global([data-fabrica-bento-grid] .bento-row-2) { grid-row: span 2; }
</style>
