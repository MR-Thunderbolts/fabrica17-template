<script lang="ts">
	/**
	 * @component Icon
	 * @tier Atom
	 * @description Universal icon primitive. Uses internal factory assets via unplugin-icons.
	 * Default weight is 'regular'.
	 */
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		icon: IconComponent, // The icon component imported from 'virtual:icons/factory/...'
		size = '1em',
		class: className,
		...rest
	}: {
		icon: any;
		size?: string | number;
		class?: string;
	} = $props();

	const attrs = $derived({
		...fabricaAttrs('icon'),
		class: `icon ${className ?? ''}`.trim(),
		style: `font-size: ${typeof size === 'number' ? size + 'px' : size};`,
		...rest
	});
</script>

{#if IconComponent}
	<span {...attrs}>
		<IconComponent />
	</span>
{/if}

<style>
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		width: 1em;
		height: 1em;
	}

	:global(.icon svg) {
		width: 1em;
		height: 1em;
	}
</style>
