<script lang="ts">
	/**
	 * @component AvatarRoot
	 * @tier Atom
	 * @description User avatar with fallback initials.
	 */
	import type { WithChild } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		src,
		alt = '',
		size = 'md',
		fallback,
		class: className,
		...rest
	}: WithChild<{
		src?: string;
		alt?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		fallback?: string;
	}> = $props();

	const attrs = $derived({
		...fabricaAttrs('avatar', { size }),
		class: `avatar ${className ?? ''}`.trim(),
		...rest
	});

	let imgError = $state(false);
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<div {...attrs}>
		{#if children}
			{@render children()}
		{:else if src && !imgError}
			<img {src} {alt} class="avatar__img" onerror={() => imgError = true} />
		{:else}
			<span class="avatar__fallback">{fallback ?? alt?.charAt(0)?.toUpperCase() ?? '?'}</span>
		{/if}
	</div>
{/if}

<style>
	.avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-full, 9999px);
		overflow: hidden;
		flex-shrink: 0;
		background: var(--color-secondary, #f3f4f6);
		color: var(--color-text-body);
		font-weight: 600;
	}

	[data-size="sm"]  { width: 24px; height: 24px; font-size: 10px; }
	[data-size="md"]  { width: 32px; height: 32px; font-size: 12px; }
	[data-size="lg"]  { width: 40px; height: 40px; font-size: 14px; }
	[data-size="xl"]  { width: 56px; height: 56px; font-size: 18px; }

	.avatar__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar__fallback {
		text-transform: uppercase;
	}
</style>
