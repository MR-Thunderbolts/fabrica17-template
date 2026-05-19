<script lang="ts">
	/**
	 * @component NavbarRoot
	 * @description Sticky header container.
	 */
	import type { WithChild, NavbarRootProps } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		sticky = true,
		class: className,
		...rest
	}: WithChild<NavbarRootProps> = $props();

	const attrs = $derived({
		...fabricaAttrs('navbar', { sticky }),
		class: `navbar ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<nav {...attrs}>
		<div class="navbar__container">
			{#if children}{@render children()}{/if}
		</div>
	</nav>
{/if}

<style>
	.navbar {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--color-neutral-bg);
		border-bottom: 1px solid var(--color-border-light);
		height: 80px;
		display: flex;
		align-items: center;
		transition: all 0.3s ease;
	}

	[data-sticky="false"] {
		position: relative;
	}

	.navbar__container {
		max-width: 1280px;
		margin: 0 auto;
		width: 100%;
		padding: 0 var(--space-8);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	@media (max-width: 768px) {
		.navbar__container {
			padding: 0 var(--space-6);
		}
	}
</style>
