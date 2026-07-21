<script lang="ts">
	/**
	 * @component BadgeRoot
	 * @tier Atom
	 * @description Inline label/tag for statuses, ratings, categories.
	 */
	import type { WithChild } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		variant = 'default',
		class: className,
		...rest
	}: WithChild<{
		variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
	}> = $props();

	const attrs = $derived({
		...fabricaAttrs('badge', { variant }),
		class: `badge ${className ?? ''}`.trim(),
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<span {...attrs}>
		{#if children}{@render children()}{/if}
	</span>
{/if}

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1, 4px);
		padding: 2px 8px;
		font-size: var(--text-xs, 12px);
		font-weight: 500;
		line-height: 1.5;
		border-radius: var(--radius-sm, 6px);
		white-space: nowrap;
	}

	[data-variant="default"] {
		background: var(--color-secondary, #f3f4f6);
		color: var(--color-text-body);
	}

	[data-variant="primary"] {
		background: var(--color-brand-soft, #eef6ff);
		color: var(--color-brand-text, #1c398e);
		border: 1px solid var(--color-brand-border, #bedbff);
	}

	[data-variant="success"] {
		background: var(--color-success-bg, #ecfdf5);
		color: var(--color-success-text, #065f46);
	}

	[data-variant="warning"] {
		background: var(--color-warning-bg, #fffbeb);
		color: var(--color-warning-text, #92400e);
	}

	[data-variant="error"] {
		background: var(--color-danger-bg, #fef2f2);
		color: var(--color-danger-text, #991b1b);
	}

	[data-variant="outline"] {
		background: transparent;
		border: 1px solid var(--color-border-light);
		color: var(--color-text-body);
	}
</style>
