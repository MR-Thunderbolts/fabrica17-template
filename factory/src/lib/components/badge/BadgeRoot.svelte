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
		border-radius: var(--radius-badge, 6px);
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
		background: #ecfdf5;
		color: #065f46;
	}

	[data-variant="warning"] {
		background: #fffbeb;
		color: #92400e;
	}

	[data-variant="error"] {
		background: #fef2f2;
		color: #991b1b;
	}

	[data-variant="outline"] {
		background: transparent;
		border: 1px solid var(--color-border-light);
		color: var(--color-text-body);
	}
</style>
