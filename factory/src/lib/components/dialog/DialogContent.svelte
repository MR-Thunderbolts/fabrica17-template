<script lang="ts">
	/**
	 * @component Dialog.Content
	 * @description The dialog panel itself. Handles focus trapping,
	 * Escape key to close, and proper ARIA attributes.
	 */
	import type { Snippet } from 'svelte';
	import type { FabricaBaseProps } from '../_shared/types';
	import { getDialogContext } from './DialogRoot.svelte';

	let {
		children,
		class: className,
		...rest
	}: FabricaBaseProps & { children?: Snippet } = $props();

	const ctx = getDialogContext();

	let contentEl: HTMLDivElement | undefined = $state();

	// Focus trap: focus the content when it opens
	$effect(() => {
		if (ctx.open && contentEl) {
			// Find first focusable element or focus the container
			const focusable = contentEl.querySelector<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (focusable) {
				focusable.focus();
			} else {
				contentEl.focus();
			}
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			ctx.close();
		}

		// Basic focus trap
		if (e.key === 'Tab' && contentEl) {
			const focusables = contentEl.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (focusables.length === 0) return;

			const first = focusables[0];
			const last = focusables[focusables.length - 1];

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	}
</script>

{#if ctx.open}
	<div
		bind:this={contentEl}
		class="dialog-content {className ?? ''}"
		data-fabrica-dialog-content
		data-state="open"
		role="dialog"
		aria-modal="true"
		aria-labelledby={ctx.labelId}
		tabindex="-1"
		onkeydown={handleKeydown}
		onclick={(e) => e.stopPropagation()}
		{...rest}
	>
		{#if children}{@render children()}{/if}
	</div>
{/if}

<style>
	.dialog-content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1000;
		background: var(--color-white, #fff);
		border-radius: var(--radius-md);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
		width: 90%;
		max-width: 500px;
		max-height: 85vh;
		overflow-y: auto;
		outline: none;
		animation: contentIn 0.25s ease-out;
	}

	@keyframes contentIn {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}
</style>
