<script lang="ts">
	/**
	 * @component InputRoot
	 * @tier Atom
	 * @description Headless text input with label and error states.
	 */
	import type { WithChild } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		type = 'text',
		placeholder,
		value = $bindable(''),
		disabled = false,
		error,
		class: className,
		...rest
	}: WithChild<{
		type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		error?: string;
	}> = $props();

	const attrs = $derived({
		...fabricaAttrs('input', {
			type,
			disabled: disabled || undefined,
			error: error ? 'true' : undefined
		}),
		class: `input ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<div {...attrs}>
		{#if children}{@render children()}{/if}
		<input
			class="input__field"
			{type}
			{placeholder}
			bind:value
			{disabled}
			aria-invalid={error ? 'true' : undefined}
		/>
		{#if error}
			<span class="input__error">{error}</span>
		{/if}
	</div>
{/if}

<style>
	.input {
		display: flex;
		flex-direction: column;
		gap: var(--space-1, 4px);
		width: 100%;
	}

	.input__field {
		padding: var(--space-3, 12px);
		border: 1px solid var(--color-border-light, #d1d5db);
		background: transparent;
		color: var(--color-text-primary);
		font-family: inherit;
		font-size: var(--text-base, 16px);
		line-height: 1.5;
		transition: border-color 0.2s;
		border-radius: var(--radius-base, 0);
	}

	.input__field::placeholder {
		color: var(--color-text-muted, rgba(0,0,0,0.4));
	}

	.input__field:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	[data-error="true"] .input__field {
		border-color: var(--color-error, #ef4444);
	}

	.input__error {
		font-size: var(--text-xs, 12px);
		color: var(--color-error, #ef4444);
	}

	.input__field:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
