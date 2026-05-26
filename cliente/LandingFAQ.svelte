<script lang="ts">
	import IconQuestion from "~icons/mynaui/question-circle";
	import IconChevronDown from "~icons/mynaui/chevron-down";
	import BadgePill from "./BadgePill.svelte";
	import { reveal } from "./reveal";

	const faqs = [
		{
			q: "¿Tiene algún costo la evaluación de sustentabilidad?",
			a: "No, la auditoría inicial de performance y sustentabilidad es 100% gratuita. Te entregaremos un reporte detallado con el estado actual de tu sitio sin compromiso."
		},
		{
			q: "¿Cómo impacta la velocidad en mis ventas?",
			a: "Por cada segundo extra de tiempo de carga, las conversiones pueden caer hasta un 20%. Un sitio más rápido mejora la experiencia del usuario y el posicionamiento en Google (SEO)."
		},
		{
			q: "¿Necesito rehacer todo mi sitio web?",
			a: "Depende del diagnóstico. A veces podemos optimizar la arquitectura actual (Optimización Web), pero en casos con bases muy antiguas o pesadas, recomendamos construir un sitio desde cero con código limpio."
		},
		{
			q: "¿Qué significa 'eficiencia digital'?",
			a: "Se refiere a reducir el peso de las imágenes, minimizar el código y usar servidores ecológicos para que cada visita a tu web consuma menos energía y genere menos emisiones de CO₂."
		},
		{
			q: "¿Cuánto tiempo toma ver resultados?",
			a: "Con la optimización web, los resultados de velocidad son inmediatos. En un sitio nuevo, entregamos la plataforma lista en 7 días y verás mejoras en métricas dentro del primer mes."
		}
	];

	// Usando Svelte 5 $state
	let openIndex = $state<number | null>(null);

	function toggleFaq(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<section class="faq-section" use:reveal>
	<div class="faq-container">
		<div class="faq-left">
			<BadgePill>
				{#snippet icon()}<IconQuestion />{/snippet}
				PREGUNTAS FRECUENTES
			</BadgePill>
			<h2 class="faq-title">Resolvamos tus dudas</h2>
		</div>

		<div class="faq-right">
			<div class="faq-list">
				{#each faqs as faq, i}
					<div class="faq-item {openIndex === i ? 'open' : ''}">
						<button class="faq-button" onclick={() => toggleFaq(i)} aria-expanded={openIndex === i}>
							<span class="faq-q">{faq.q}</span>
							<div class="faq-icon-wrapper">
								<IconChevronDown width="24" height="24" class="faq-icon" />
							</div>
						</button>
						{#if openIndex === i}
							<div class="faq-a">
								<p>{faq.a}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.faq-section {
		padding: var(--section-pad-lg) var(--gutter);
		background: var(--color-surface-base);
		width: 100%;
	}

	.faq-container {
		display: flex;
		gap: 64px;
		max-width: 1128px;
		margin: 0 auto;
	}

	.faq-left {
		flex: 1;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: flex-start;
	}


	.faq-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		letter-spacing: -0.01em;
		margin: 0;
	}

	.faq-right {
		flex: 1.5;
	}

	.faq-list {
		display: flex;
		flex-direction: column;
	}

	.faq-item {
		border-bottom: 1px solid var(--color-border-card);
	}

	.faq-item:first-child {
		border-top: 1px solid var(--color-border-card);
	}

	.faq-button {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px 0;
		background: transparent;
		border: none;
		color: var(--color-white);
		text-align: left;
		cursor: pointer;
	}

	.faq-q {
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 600;
		padding-right: 24px;
	}

	.faq-icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.05);
		transition: background var(--dur-fast) var(--ease-out-expo);
		flex-shrink: 0;
	}

	.faq-item.open .faq-icon-wrapper {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	:global(.faq-icon) {
		transition: transform var(--dur-normal) var(--ease-out-expo);
	}

	.faq-item.open :global(.faq-icon) {
		transform: rotate(180deg);
	}

	.faq-a {
		padding-bottom: 24px;
		padding-right: 48px;
	}

	.faq-a p {
		font-family: var(--font-body);
		font-size: 16px;
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 24px;
		margin: 0;
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.faq-section {
			padding: var(--section-pad-sm) var(--gutter);
		}

		.faq-container {
			flex-direction: column;
			gap: 40px;
		}

		.faq-title {
			font-size: var(--text-2xl);
			line-height: 1.15;
		}

		.faq-q {
			font-size: var(--text-base);
		}

		.faq-a {
			padding-right: 0;
		}
	}
</style>
