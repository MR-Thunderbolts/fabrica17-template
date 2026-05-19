<script lang="ts">
	/**
	 * @component Dialog.Overlay
	 * @description Backdrop that closes the dialog on click.
	 */
	import type { FabricaBaseProps } from '../_shared/types';
	import { getDialogContext } from './DialogRoot.svelte';

	let {
		class: className,
		...rest
	}: FabricaBaseProps = $props();

	const ctx = getDialogContext();
</script>

{#if ctx.open}
	<div
		class="dialog-overlay {className ?? ''}"
		data-fabrica-dialog-overlay
		data-state={ctx.open ? 'open' : 'closed'}
		onclick={ctx.close}
		onkeydown={(e) => { if (e.key === 'Escape') ctx.close(); }}
		role="presentation"
		{...rest}
	></div>
{/if}

<style>
	.dialog-overlay {
		position: fixed;
		inset: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		animation: overlayIn 0.2s ease-out;
	}

	@keyframes overlayIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
