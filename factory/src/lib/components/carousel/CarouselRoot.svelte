<script lang="ts">
	/**
	 * @component CarouselRoot
	 * @description Apple-style horizontal carousel container.
	 */
	import type { WithChild } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		navigation = 'none',
		class: className,
		...rest
	}: WithChild & { navigation?: 'none' | 'floating' } = $props();

	const attrs = $derived({
		...fabricaAttrs('carousel', { navigation }),
		class: `carousel-wrapper ${className ?? ''}`.trim(),
		...rest
	});
</script>

<div {...attrs}>
	{#if children}{@render children()}{/if}
</div>

<style>
	.carousel-wrapper {
		width: 100%;
		padding: var(--space-8) 0;
		background: transparent;
		overflow: visible;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	/* Floating variant: no inductive padding here, we use track padding instead */
	:global([data-navigation="floating"]) {
		overflow: visible;
	}
</style>
