<script lang="ts">
	import { navigating } from "$app/stores";
	import logoCiclo from "./assets/Logo-Ciclo17.svg?raw";
	import { fade } from "svelte/transition";
</script>

{#if $navigating}
	<div class="loading-overlay" transition:fade={{ duration: 250 }}>
		<div class="progress-bar"></div>
		<div class="logo-wrapper">
			<div class="logo-pulse">
				{@html logoCiclo}
			</div>
			<div class="loading-text">Cargando experiencia...</div>
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
		background: linear-gradient(90deg, var(--color-primary), var(--color-accent-primary));
		width: 100%;
		animation: loadingShim 2s infinite linear;
		transform-origin: left;
	}

	.logo-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	.logo-pulse {
		animation: pulseScale 1.8s infinite cubic-bezier(0.65, 0, 0.35, 1);
	}

	.logo-pulse :global(svg) {
		height: 48px;
		width: auto;
	}

	.loading-text {
		font-family: var(--font-headline);
		font-size: var(--text-sm);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		opacity: 0.8;
	}

	@keyframes loadingShim {
		0% {
			transform: scaleX(0);
		}
		50% {
			transform: scaleX(0.7);
		}
		100% {
			transform: scaleX(1);
		}
	}

	@keyframes pulseScale {
		0% {
			transform: scale(0.95);
			opacity: 0.6;
			filter: drop-shadow(0 0 8px rgba(214, 244, 122, 0.1));
		}
		50% {
			transform: scale(1.05);
			opacity: 1;
			filter: drop-shadow(0 0 16px rgba(214, 244, 122, 0.4));
		}
		100% {
			transform: scale(0.95);
			opacity: 0.6;
			filter: drop-shadow(0 0 8px rgba(214, 244, 122, 0.1));
		}
	}
</style>
