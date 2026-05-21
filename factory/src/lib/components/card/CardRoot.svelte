<script lang="ts">
	/**
	 * @component CardRoot
	 * @tier Molecule
	 * @description Headless card container. Supports variants via data-attributes.
	 * Agent composes the card interior per-project using atoms.
	 */
	import type { WithChild } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		variant = 'elevated',
		interactive = false,
		onclick,
		class: className,
		...rest
	}: WithChild<{
		variant?: 'elevated' | 'outlined' | 'filled' | 'ghost' | 'blank';
		interactive?: boolean;
		onclick?: (e: MouseEvent) => void;
	}> = $props();

	const attrs = $derived({
		...fabricaAttrs('card', {
			variant,
			interactive: interactive || undefined
		}),
		class: variant === 'blank' ? (className ?? '') : `card ${className ?? ''}`.trim(),
		onclick,
		role: interactive ? 'button' : undefined,
		tabindex: interactive ? 0 : undefined,
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<div {...attrs}>
		{#if children}{@render children()}{/if}
	</div>
{/if}

<style>
	.card {
		border-radius: var(--radius-base, 12px);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	[data-variant="elevated"] {
		background: var(--color-surface-base, #ffffff);
		box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
	}

	[data-variant="outlined"] {
		background: var(--color-surface-base, #ffffff);
		border: 1px solid var(--color-border-card, #e5e7eb);
	}

	[data-variant="filled"] {
		background: var(--color-bg-base, #f3f4f6);
	}

	[data-variant="ghost"] {
		background: transparent;
	}

	[data-interactive]:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
		cursor: pointer;
	}
</style>
