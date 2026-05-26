<script lang="ts">
	import logoCiclo from "./assets/Logo-Ciclo17.svg?raw";

	let { url = "" } = $props<{ url?: string }>();

	let stage = $state(0);
	const stages = [
		"Conectando con tu sitio",
		"Analizando velocidad y tiempos de carga",
		"Evaluando experiencia y conversión",
		"Midiendo estabilidad y respuesta",
		"Identificando oportunidades de mejora",
		"Preparando reporte"
	];

	$effect(() => {
		const interval = setInterval(() => {
			if (stage < stages.length - 1) {
				stage++;
			}
		}, 1200); // 1.2s per stage for a smoother, high-quality transition
		return () => clearInterval(interval);
	});
</script>

<div class="loading-page">

	<div class="loading-content">
		<div class="spinner-container">
			<div class="spinner-ring"></div>
			<div class="spinner-icon logo-center">
				{@html logoCiclo}
			</div>
		</div>

		<h2 class="loading-title">{stages[stage]}</h2>
		<p class="loading-hint">Esta acción puede tardar entre 20 a 60 segundos</p>

		<ul class="progress-list">
			{#each stages as step, i}
				<li class="progress-item {i <= stage ? 'done' : 'pending'}">
					<div class="step-indicator">
						{#if i <= stage}
							<div class="dot done"></div>
						{:else}
							<div class="dot pending"></div>
						{/if}
					</div>
					<span>{step}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.loading-page {
		min-height: 100vh;
		min-height: 100dvh;
		background: var(--color-audit-bg);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loading-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		padding: 80px clamp(20px, 5vw, 40px);
		max-width: 480px;
		width: 100%;
	}

	.spinner-container {
		position: relative;
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spinner-ring {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2.5px solid rgba(255, 255, 255, 0.08);
		border-top-color: var(--color-accent-primary);
		animation: spin 1.2s linear infinite;
	}

	.spinner-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		animation: pulse 2s ease-in-out infinite;
	}

	.logo-center :global(svg) {
		height: 28px;
		width: auto;
	}

	.loading-title {
		color: var(--color-white);
		font-family: var(--font-headline);
		font-size: var(--text-xl);
		line-height: 1.15;
		font-weight: 700;
		margin: 0;
		text-align: center;
	}

	.loading-hint {
		font-family: var(--font-body);
		font-size: 14px;
		color: var(--color-text-muted);
		margin: 0;
		text-align: center;
	}

	.progress-list {
		list-style: none;
		padding: 0;
		margin: 16px 0 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
		width: 100%;
	}

	.progress-item {
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: var(--font-body);
		font-size: 14px;
		transition: color var(--dur-normal) var(--ease-out-expo);
	}

	.progress-item.done {
		color: var(--color-white);
	}

	.progress-item.pending {
		color: var(--color-text-muted);
		opacity: 0.5;
	}

	.step-indicator {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.dot {
		border-radius: 50%;
		transition: all var(--dur-normal) var(--ease-out-expo);
	}

	.dot.done {
		width: 10px;
		height: 10px;
		background: var(--color-accent-primary);
		box-shadow: 0 0 8px rgba(214, 244, 122, 0.4);
	}

	.dot.pending {
		width: 8px;
		height: 8px;
		background: rgba(255, 255, 255, 0.15);
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	@media (max-width: 768px) {
		.loading-content {
			padding: 48px clamp(20px, 5vw, 40px);
		}

		.loading-title {
			font-size: 22px;
		}
	}
</style>
