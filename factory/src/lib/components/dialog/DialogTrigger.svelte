<script lang="ts">
	/**
	 * @component Dialog.Trigger
	 * @description Button that toggles the dialog open state.
	 * Supports WithChild for custom trigger elements.
	 */
	import type { WithChild } from '../_shared/types';
	import { getDialogContext } from './DialogRoot.svelte';

	let {
		children,
		child,
		class: className,
		...rest
	}: WithChild = $props();

	const ctx = getDialogContext();

	const triggerProps = $derived({
		onclick: ctx.toggle,
		'aria-haspopup': 'dialog' as const,
		'aria-expanded': ctx.open,
		'data-fabrica-dialog-trigger': true,
		class: className,
		...rest
	});
</script>

{#if child}
	{@render child({ props: triggerProps })}
{:else}
	<button {...triggerProps}>
		{#if children}{@render children()}{/if}
	</button>
{/if}
