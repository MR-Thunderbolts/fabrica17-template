<script lang="ts">
	/**
	 * @component HeadingRoot
	 * @tier Atom
	 * @description Semantic heading with optional badge and subheading.
	 * Extracted from Hero.Content — now a universal primitive.
	 */
	import type { WithChild } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		variant = 'default',
		level = 'h1',
		badge,
		subheading,
		class: className,
		...rest
	}: WithChild<{
		variant?: 'default' | 'blank';
		level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		badge?: string;
		subheading?: string;
	}> = $props();

	const attrs = $derived({
		...fabricaAttrs('heading', { level, variant }),
		class: variant === 'blank' ? (className ?? '') : `heading ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<div {...attrs}>
		{#if badge}
			<span class={variant === 'blank' ? '' : 'heading__badge'}>{badge}</span>
		{/if}
		<svelte:element this={level} class={variant === 'blank' ? '' : 'heading__title'}>
			{#if children}{@render children()}{:else}Heading{/if}
		</svelte:element>
		{#if subheading}
			<p class={variant === 'blank' ? '' : 'heading__sub'}>{subheading}</p>
		{/if}
	</div>
{/if}

<style>
	.heading {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.heading__badge {
		font-size: var(--text-sm, 14px);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted, currentColor);
	}

	.heading__title {
		margin: 0;
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: var(--color-text-heading);
		font-family: var(--font-headline, inherit);
	}

	.heading__sub {
		margin: 0;
		line-height: 1.5;
		color: var(--color-text-body);
		font-size: var(--text-md, 18px);
	}
</style>
