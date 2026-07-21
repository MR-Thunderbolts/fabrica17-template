<script lang="ts">
	let {
		width = "100%",
		height = "200px",
		borderRadius = "var(--radius-lg)"
	}: {
		width?: string;
		height?: string;
		borderRadius?: string;
	} = $props();
</script>

<div
	class="skeleton-card"
	style:width={width}
	style:height={height}
	style:border-radius={borderRadius}
	aria-hidden="true"
></div>

<style>
	.skeleton-card {
		background: linear-gradient(
			90deg,
			var(--color-surface-muted) 25%,
			var(--color-surface-dark) 37%,
			var(--color-surface-muted) 63%
		);
		background-size: 400% 100%;
		animation: shimmer 1.4s ease infinite;
		border: 1px solid var(--color-border-card);
	}

	@keyframes shimmer {
		0% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
