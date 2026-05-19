<script lang="ts">
	/**
	 * @component ButtonRoot
	 * @description Headless button atom with WithChild renderless override.
	 * Supports variant styling via data attributes.
	 */
	import type { WithChild, ButtonProps } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		variant = 'primary',
		type = 'button',
		disabled = false,
		onclick,
		ariaLabel,
		class: className,
		...rest
	}: WithChild<ButtonProps> = $props();

	const attrs = $derived({
		...fabricaAttrs('button', { variant, disabled: disabled || undefined }),
		class: variant === 'blank' ? (className ?? '') : `btn ${className ?? ''}`.trim(),
		type,
		disabled: disabled || undefined,
		onclick,
		'aria-label': ariaLabel,
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<button {...attrs}>
		{#if children}{@render children()}{/if}
	</button>
{/if}

<style>
	.btn {
		padding: var(--space-3) var(--space-6);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		border: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		font-family: inherit;
		line-height: 1;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Variant styling via data attributes */
	:global([data-fabrica-button][data-variant="primary"]) {
		background: var(--color-primary);
		color: var(--color-primary-foreground, var(--color-neutral-bg));
	}

	:global([data-fabrica-button][data-variant="primary"]:hover:not(:disabled)) {
		opacity: var(--hover-opacity, 0.9);
	}

	:global([data-fabrica-button][data-variant="secondary"]) {
		background: var(--color-neutral-bg);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-light);
	}

	:global([data-fabrica-button][data-variant="secondary"]:hover:not(:disabled)) {
		background: var(--color-primary);
		color: var(--color-primary-foreground, var(--color-neutral-bg));
		border-color: var(--color-primary);
	}

	:global([data-fabrica-button][data-variant="ghost"]) {
		background: transparent;
		color: var(--color-text-primary);
	}

	:global([data-fabrica-button][data-variant="ghost"]:hover:not(:disabled)) {
		background: var(--color-neutral-bg);
	}

	:global([data-fabrica-button][data-variant="outline"]) {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-light);
	}

	:global([data-fabrica-button][data-variant="outline"]:hover:not(:disabled)) {
		background: var(--color-text-primary);
		color: var(--color-neutral-bg);
	}
</style>
