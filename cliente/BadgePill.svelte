<script lang="ts">
	import type { Snippet } from 'svelte';

	let { icon, children, color = 'var(--color-primary)' }: {
		icon?: Snippet;
		children?: Snippet;
		color?: string;
	} = $props();
</script>

<div class="badge-pill">
	{#if icon}
		<span class="badge-icon" style="color: {color}">
			{@render icon()}
		</span>
	{/if}
	{#if children}
		<span class="badge-text" style="color: {color}">
			{@render children()}
		</span>
	{/if}
</div>

<style>
	.badge-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 13px;
		border-radius: var(--radius-lg);
		background: var(--color-surface-tag);
		border: 1px solid var(--color-border-card);
		backdrop-filter: blur(2.675px);
		-webkit-backdrop-filter: blur(2.675px);
		width: fit-content;
	}

	.badge-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.badge-icon :global(svg) {
		color: inherit;
		width: 16px;
		height: 16px;
	}

	.badge-text {
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 400;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		line-height: 16px;
	}
</style>
