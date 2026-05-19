<script lang="ts">
	/**
	 * @component DividerRoot
	 * @tier Atom
	 * @description Horizontal or vertical separator line.
	 */
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		orientation = 'horizontal',
		class: className,
		...rest
	}: {
		orientation?: 'horizontal' | 'vertical';
		class?: string;
	} = $props();

	const attrs = $derived({
		...fabricaAttrs('divider', { orientation }),
		role: 'separator',
		'aria-orientation': orientation,
		class: `divider ${className ?? ''}`.trim(),
		...rest
	});
</script>

<div {...attrs}></div>

<style>
	.divider {
		border: none;
		flex-shrink: 0;
	}

	[data-orientation="horizontal"] {
		width: 100%;
		height: 1px;
		background: var(--color-border-light, #e5e7eb);
	}

	[data-orientation="vertical"] {
		width: 1px;
		height: 100%;
		background: var(--color-border-light, #e5e7eb);
	}
</style>
