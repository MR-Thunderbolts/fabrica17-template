<script lang="ts">
	/**
	 * @component CarouselHeader
	 * @description Header for the carousel with title and navigation buttons.
	 */
	import type { WithChild, CarouselHeaderProps } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';
	import { glow } from '$root/utils/glow-action';

	let {
		children,
		child,
		title = "Conoce nuestra tecnología",
		onScroll,
		class: className,
		...rest
	}: WithChild<CarouselHeaderProps> = $props();

	const attrs = $derived({
		...fabricaAttrs('carousel-header'),
		class: `carousel-header ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<header {...attrs}>
		<h2>{title}</h2>
		<div class="carousel-nav">
			<button 
				class="nav-btn glow-premium" 
				use:glow 
				style="--glow-size: 150px"
				onclick={() => onScroll?.('left')} 
				aria-label="Previous"
			>
				←
			</button>
			<button 
				class="nav-btn glow-premium" 
				use:glow 
				style="--glow-size: 150px"
				onclick={() => onScroll?.('right')} 
				aria-label="Next"
			>
				→
			</button>
		</div>
		{#if children}{@render children()}{/if}
	</header>
{/if}

<style>
	.carousel-header {
		max-width: 1280px;
		margin: 0 auto var(--space-12) auto;
		padding: 0 var(--space-8);
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		width: 100%;
		box-sizing: border-box;
	}

	h2 {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 800;
		color: var(--color-text-primary);
		margin: 0;
		letter-spacing: -0.05em;
		line-height: 1;
		max-width: 800px;
	}

	.carousel-nav {
		display: flex;
		gap: var(--space-3);
	}

	.nav-btn {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: var(--color-neutral-bg);
		border: 1px solid var(--color-border-light);
		color: var(--color-text-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: var(--shadow-sm);
	}

	.nav-btn:hover {
		background: var(--color-text-primary);
		color: var(--color-neutral-bg);
		transform: scale(1.05);
	}

	@media (max-width: 768px) {
		.carousel-header { padding: 0 var(--space-6); }
		.carousel-nav { display: none; }
	}
</style>
