<script lang="ts">
	/**
	 * @component NavbarActions
	 * @tier Molecule
	 * @description Right-side actions slot. 
	 * Maximal Molecule Protocol: Removed hardcoded governance toggles.
	 * Agent composes buttons, avatars, or icons here per design.
	 */
	import type { WithChild } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		class: className,
		...rest
	}: WithChild<{}> = $props();

	const attrs = $derived({
		...fabricaAttrs('navbar-actions'),
		class: `navbar__right ${className ?? ''}`.trim(),
		...rest
	});
</script>

<div {...attrs}>
	{#if children}
		{@render children()}
	{:else if child}
		{@render child({ props: {} })}
	{/if}
</div>

<style>
	.navbar__right {
		display: flex;
		align-items: center;
		gap: var(--space-6, 24px);
	}
</style>
