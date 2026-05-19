<script lang="ts">
	/**
	 * @component MediaRoot
	 * @tier Atom
	 * @description Image/video display with aspect ratio control.
	 * Extracted from Hero.Visual — universal media primitive.
	 */
	import type { WithChild } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		src,
		alt = '',
		aspect = 'auto',
		fit = 'cover',
		class: className,
		...rest
	}: WithChild<{
		src?: string;
		alt?: string;
		aspect?: 'auto' | '1/1' | '16/9' | '4/3' | '3/2';
		fit?: 'cover' | 'contain' | 'fill';
	}> = $props();

	const attrs = $derived({
		...fabricaAttrs('media', { aspect, fit }),
		class: `media ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<div {...attrs}>
		{#if children}
			{@render children()}
		{:else if src}
			<img {src} {alt} class="media__img" loading="lazy" />
		{/if}
	</div>
{/if}

<style>
	.media {
		overflow: hidden;
		border-radius: var(--radius-base, 0);
		background: var(--color-secondary, #f3f4f6);
	}

	[data-aspect="1/1"]  { aspect-ratio: 1 / 1; }
	[data-aspect="16/9"] { aspect-ratio: 16 / 9; }
	[data-aspect="4/3"]  { aspect-ratio: 4 / 3; }
	[data-aspect="3/2"]  { aspect-ratio: 3 / 2; }

	.media__img {
		width: 100%;
		height: 100%;
		display: block;
	}

	[data-fit="cover"]   .media__img { object-fit: cover; }
	[data-fit="contain"] .media__img { object-fit: contain; }
	[data-fit="fill"]    .media__img { object-fit: fill; }
</style>
