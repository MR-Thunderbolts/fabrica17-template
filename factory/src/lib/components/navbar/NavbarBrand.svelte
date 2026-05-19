<script lang="ts">
	/**
	 * @component NavbarBrand
	 * @description Logo and brand name slot.
	 */
	import type { WithChild, NavbarBrandProps } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		icon,
		brandName = 'Fabrica17',
		href = '/',
		class: className,
		...rest
	}: WithChild<NavbarBrandProps & { icon?: import('svelte').Snippet }> = $props();

	const attrs = $derived({
		...fabricaAttrs('navbar-brand'),
		href,
		class: `navbar__brand ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<a {...attrs}>
		{#if icon}
			{@render icon()}
		{/if}
		{#if children}
			{@render children()}
		{:else}
			<span>{brandName}</span>
		{/if}
	</a>
{/if}

<style>
	.navbar__brand {
		font-weight: 700;
		font-size: 1.25rem;
		text-decoration: none;
		color: var(--color-text-primary);
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}
</style>
