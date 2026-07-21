<script lang="ts">
	/**
	 * @component PageLoadingOverlay
	 * @description Overlay de navegación genérico. En un proyecto de
	 * cliente, reemplaza el spinner por el logo de la marca
	 * (importado desde ./assets/) si el branding lo requiere.
	 */
	import { navigating } from "$app/stores";
	import { fade } from "svelte/transition";
</script>

{#if $navigating}
	<div class="loading-overlay" transition:fade={{ duration: 250 }}>
		<div class="progress-bar"></div>
		<div class="logo-wrapper">
			<div class="spinner" aria-hidden="true"></div>
			<div class="loading-text">Cargando...</div>
		</div>
	</div>
{/if}

<style>
	.loading-overlay {
		position: fixed;
		inset: 0;
		background: var(--color-bg-deep);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		pointer-events: all;
	}

	.progress-bar {
		position: absolute;
		top: 0;
		left: 0;
		height: 3px;
		background: var(--color-primary);
		width: 100%;
		animation: loadingShim 2s infinite linear;
		transform-origin: left;
	}

	.logo-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
	}

	.spinner {
		width: 36px;
		height: 36px;
		border-radius: var(--radius-full);
		border: 3px solid var(--color-border-light);
		border-top-color: var(--color-primary);
		animation: spin 0.9s linear infinite;
	}

	.loading-text {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	@keyframes loadingShim {
		0% { transform: scaleX(0); }
		50% { transform: scaleX(0.6); }
		100% { transform: scaleX(1); }
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	@media (prefers-reduced-motion: reduce) {
		.progress-bar,
		.spinner {
			animation: none;
		}
	}
</style>
