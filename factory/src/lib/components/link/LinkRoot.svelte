<script lang="ts">
	/**
	 * @component LinkRoot
	 * @tier Atom
	 * @description Styled anchor with active, underline, and external states.
	 */
	import type { WithChild } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		href = '#',
		active = false,
		underline = false,
		external = false,
		class: className,
		...rest
	}: WithChild<{
		href?: string;
		active?: boolean;
		underline?: boolean;
		external?: boolean;
	}> = $props();

	const attrs = $derived({
		...fabricaAttrs('link', {
			active: active || undefined,
			underline: underline || undefined,
			external: external || undefined
		}),
		href,
		class: `link ${className ?? ''}`.trim(),
		target: external ? '_blank' : undefined,
		rel: external ? 'noopener noreferrer' : undefined,
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<a {...attrs}>
		{#if children}{@render children()}{/if}
	</a>
{/if}

<style>
	.link {
		color: var(--color-text-primary);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s, opacity 0.2s;
		cursor: pointer;
	}

	.link:hover {
		opacity: 0.7;
	}

	[data-active] {
		color: var(--color-primary);
	}

	[data-underline] {
		text-decoration: underline;
		text-underline-offset: 2px;
	}
</style>
