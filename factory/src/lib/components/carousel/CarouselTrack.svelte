<script lang="ts">
	/**
	 * @component CarouselTrack
	 * @description Scrollable track for carousel items.
	 */
	import type { WithChild, CarouselTrackProps } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		scrollContainer = $bindable(),
		class: className,
		...rest
	}: WithChild<CarouselTrackProps> = $props();

	const attrs = $derived({
		...fabricaAttrs('carousel-container'),
		class: `carousel-container ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<div {...attrs} bind:this={scrollContainer}>
		<div class="carousel-track">
			<div class="carousel-spacer"></div>
			{#if children}{@render children()}{/if}
			<div class="carousel-spacer"></div>
		</div>
	</div>
{/if}

<style>
	.carousel-container {
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: none;
		-ms-overflow-style: none;
		padding-bottom: var(--space-12);
	}

	.carousel-container::-webkit-scrollbar {
		display: none;
	}

	.carousel-track {
		display: flex;
		gap: var(--space-6);
		width: max-content;
		padding: var(--space-2) 0 var(--space-4) 0;
	}

	.carousel-spacer {
		width: var(--space-16);
		flex-shrink: 0;
	}

	@media (max-width: 768px) {
		.carousel-spacer {
			width: var(--space-4);
		}
	}
</style>
