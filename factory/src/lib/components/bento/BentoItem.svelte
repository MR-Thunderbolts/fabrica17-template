<script lang="ts">
	/**
	 * @component BentoItem
	 * @description Individual item within a Bento grid. Supports title, description,
	 * icon, and custom content via children snippet.
	 */
	import type { WithChild, BentoItemProps } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		title,
		description,
		icon,
		class: className,
		...rest
	}: WithChild<BentoItemProps> = $props();

	const attrs = $derived({
		...fabricaAttrs('bento-item'),
		class: `bento-item ${className ?? ''}`.trim(),
		role: 'presentation',
		...rest
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<div {...attrs}>
		<div class="bento-item__content">
			{#if icon}
				<div class="bento-item__icon">{icon}</div>
			{/if}
			<div class="bento-item__text">
				<h3>{title}</h3>
				{#if description}
					<p>{description}</p>
				{/if}
			</div>

			{#if children}
				<div class="bento-item__custom">
					{@render children()}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.bento-item {
		position: relative;
		background: var(--color-neutral-bg);
		border: 1px solid var(--color-border-light);
		border-radius: var(--radius-lg);
		overflow: hidden;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		transition: border-color var(--transition-fast);
	}

	.bento-item:hover {
		border-color: var(--color-text-primary);
	}

	.bento-item__content {
		position: relative;
		z-index: 1;
		padding: var(--space-8);
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.bento-item__icon {
		font-size: 2rem;
	}

	h3 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin: 0;
		letter-spacing: -0.04em;
	}

	p {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: var(--space-2) 0 0 0;
		line-height: 1.6;
	}

	.bento-item__custom {
		margin-top: auto;
		width: 100%;
	}
</style>
