<script lang="ts">
	/**
	 * @component SectionRoot
	 * @description The layout engine of the library. Implements standardized spacing
	 * and containment via data attributes. Supports optional sidebar layout.
	 * 
	 * This is the "Gold Standard" component — it already followed most of the
	 * target patterns before the migration.
	 */
	import type { Snippet } from 'svelte';
	import type { WithChild, SectionProps } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		id,
		padding = 'large',
		background = 'default',
		content,
		sidebar,
		fullWidth = false,
		class: className,
		...rest
	}: WithChild<SectionProps> = $props();

	const attrs = $derived({
		...fabricaAttrs('section', { padding, bg: background }),
		id,
		class: `section ${className ?? ''}`.trim(),
		...rest
	});
</script>

<section {...attrs}>
	<div class="container" class:full-width={fullWidth}>
		<div class="layout-grid" class:has-sidebar={!!sidebar}>
			<div class="content-area">
				{@render content()}
			</div>

			{#if sidebar}
				<aside class="sidebar-area">
					{@render sidebar()}
				</aside>
			{/if}
		</div>
	</div>
</section>

<style>
	.section {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	/* Paddings via data attributes */
	:global([data-padding="small"])  { padding: var(--space-8) 0; }
	:global([data-padding="medium"]) { padding: var(--space-16) 0; }
	:global([data-padding="large"])  { padding: var(--space-24) 0; }
	:global([data-padding="none"])   { padding: 0; }

	/* Backgrounds via data attributes */
	:global([data-bg="default"]) {
		background: var(--color-neutral-bg);
		color: var(--color-text-primary);
	}
	:global([data-bg="warm"]), :global([data-bg="muted"]) {
		background: var(--color-neutral-warm, var(--color-neutral-bg));
		color: var(--color-text-primary);
	}
	:global([data-bg="primary"]) {
		background: var(--color-primary);
		color: var(--color-white);
	}

	.container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 var(--space-8);
		width: 100%;
	}

	.container.full-width {
		max-width: 100%;
		padding: 0;
	}

	.layout-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-12);
	}

	.layout-grid.has-sidebar {
		grid-template-columns: minmax(0, 1fr) 320px;
	}

	@media (max-width: 1024px) {
		.layout-grid.has-sidebar {
			grid-template-columns: 1fr;
		}
	}
</style>
