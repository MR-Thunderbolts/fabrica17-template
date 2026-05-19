<script lang="ts">
	/**
	 * @component Dialog.Close
	 * @description Button inside dialog content that closes the dialog.
	 * Supports WithChild for custom close elements.
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

	const closeProps = $derived({
		onclick: ctx.close,
		'aria-label': 'Close dialog',
		'data-fabrica-dialog-close': true,
		class: `dialog-close ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: closeProps })}
{:else}
	<button {...closeProps}>
		{#if children}
			{@render children()}
		{:else}
			<span aria-hidden="true">×</span>
		{/if}
	</button>
{/if}

<style>
	.dialog-close {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--color-text-muted);
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-sm);
		transition: background var(--transition-fast);
	}

	.dialog-close:hover {
		background: var(--color-neutral-bg);
		color: var(--color-text-primary);
	}
</style>
