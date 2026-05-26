<script lang="ts">
	import IconGlobe from "~icons/mynaui/globe";
	import Tooltip from "./Tooltip.svelte";

	let { url, date, scores } = $props<{
		url: string;
		date: string;
		scores: {
			main: number;
			status: string;
			performance: number;
			quality: number;
			efficiency: number;
			satisfaction: number;
		}
	}>();

	function getScoreColorClass(score: number) {
		if (score >= 90) return 'color-success';
		if (score >= 50) return 'color-warning';
		return 'color-error';
	}
</script>

<section class="section-perfodigital">
	<div class="score-card main-score">
		<div class="score-circle-wrapper {getScoreColorClass(scores.main)}">
			<div class="score-circle">
				{scores.main}
			</div>
		</div>
		<div class="score-details">
			<div class="status-label {
				scores.status === 'Óptimo' ? 'status-success' :
				scores.status === 'Mejorable' ? 'status-warning' : 'status-error'
			}">
				{scores.status}
			</div>
			<h4 class="score-title">
				Tu sitio tiene margen<br>para rendir mucho mejor
			</h4>
			<p class="score-desc">
				Esta puntuación refleja el rendimiento real de tu sitio considerando velocidad, interacción, estabilidad y eficiencia digital.
			</p>
		</div>
	</div>

	<div class="score-card site-details">
		<div class="details-header">
			<span class="details-label">Sitio analizado</span>
			<h5 class="details-url">{url}</h5>
		</div>
		<div class="details-list">
			<div class="details-row">
				<span>Fecha auditoría</span>
				<strong>{date}</strong>
			</div>
			<div class="details-row">
				<span>Tipo</span>
				<strong class="color-success">Gratuita</strong>
			</div>
			<div class="details-row">
				<span>Métricas</span>
				<strong>12 evaluadas</strong>
			</div>
		</div>
	</div>
</section>

<!-- Sub-sección: Grid de 4 scores detallados -->
<section class="section-perfoscores">
	<div class="section-header">
		<IconGlobe width="20" height="20" class="icon-accent" />
		<h3 class="section-title">Resumen Performance</h3>
		<span class="section-site">{url}</span>
	</div>
	
	<div class="scores-grid">
		<!-- Rendimiento -->
		<div class="score-item-card">
			<Tooltip 
				title="Rendimiento" 
				description="Mide el desempeño técnico de tu sitio web analizando tiempos de carga, bloqueos de renderizado y el peso de los recursos. Un rendimiento óptimo aumenta la retención y conversión de usuarios."
				learnMoreUrl="#"
				absolute={true}
			/>
			<div class="circular-chart {getScoreColorClass(scores.performance)}">
				<span class="chart-value">{scores.performance}</span>
			</div>
			<span class="chart-label">Rendimiento</span>
		</div>
		<!-- Calidad -->
		<div class="score-item-card">
			<Tooltip 
				title="Calidad" 
				description="Evalúa las mejores prácticas de desarrollo web, incluyendo seguridad HTTPS, ausencia de errores de consola, optimización de imágenes y cumplimiento de estándares. Una alta calidad mejora la confianza del usuario y el SEO."
				learnMoreUrl="#"
				absolute={true}
			/>
			<div class="circular-chart {getScoreColorClass(scores.quality)}">
				<span class="chart-value">{scores.quality}</span>
			</div>
			<span class="chart-label">Calidad</span>
		</div>
		<!-- Eficiencia -->
		<div class="score-item-card">
			<Tooltip 
				title="Eficiencia" 
				description="Mide cuántos recursos computacionales consume tu sitio: CPU, memoria, ancho de banda. Un sitio eficiente carga más rápido, consume menos batería en móviles y genera menor huella de carbono digital."
				learnMoreUrl="#"
				absolute={true}
			/>
			<div class="circular-chart {getScoreColorClass(scores.efficiency)}">
				<span class="chart-value">{scores.efficiency}</span>
			</div>
			<span class="chart-label">Eficiencia</span>
		</div>
		<!-- Satisfacción -->
		<div class="score-item-card">
			<Tooltip 
				title="Satisfacción" 
				description="Refleja la experiencia percibida del usuario: accesibilidad, legibilidad, navegación intuitiva y cumplimiento de expectativas de interacción. Una alta satisfacción se traduce en menor tasa de rebote y más conversiones."
				learnMoreUrl="#"
				absolute={true}
			/>
			<div class="circular-chart {getScoreColorClass(scores.satisfaction)}">
				<span class="chart-value">{scores.satisfaction}</span>
			</div>
			<span class="chart-label">Satisfacción</span>
		</div>
	</div>
</section>

<style>
	.section-perfodigital {
		display: flex;
		gap: 32px;
		padding: 24px 0;
		width: 100%;
	}

	:global(.score-card) {
		background: var(--color-surface-base) !important;
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		border-radius: 28px !important;
		flex: 1;
		min-width: 316px;
	}

	:global(.main-score) {
		display: flex !important;
		flex-direction: row !important;
		align-items: center !important;
		gap: 36px !important;
		padding: 33px !important;
	}

	.score-circle-wrapper {
		width: 155px;
		height: 156px;
		border-radius: 1000px;
		backdrop-filter: blur(2px);
		border: 8px solid;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	/* Dynamic color variants for the hero score ring */
	.score-circle-wrapper.color-success {
		background: var(--color-success-bg);
		border-color: var(--color-success);
		box-shadow: 0px 0px 20px 0px var(--color-success-glow);
	}
	.score-circle-wrapper.color-success .score-circle {
		color: var(--color-success);
	}

	.score-circle-wrapper.color-warning {
		background: rgba(243, 186, 37, 0.12);
		border-color: var(--color-warning);
		box-shadow: 0px 0px 20px 0px rgba(243, 186, 37, 0.35);
	}
	.score-circle-wrapper.color-warning .score-circle {
		color: var(--color-warning);
	}

	.score-circle-wrapper.color-error {
		background: var(--color-error-bg);
		border-color: var(--color-error);
		box-shadow: 0px 0px 20px 0px rgba(255, 107, 107, 0.35);
	}
	.score-circle-wrapper.color-error .score-circle {
		color: var(--color-error);
	}

	.score-circle {
		font-family: var(--font-headline);
		font-weight: 700;
		font-size: 60px;
		line-height: 72px;
		/* color is set by parent .color-* class */
	}

	.score-details {
		display: flex;
		flex-direction: column;
		gap: 12px;
		flex: 1;
	}

	.status-label {
		display: inline-flex;
		align-items: center;
		padding: 4px 12px;
		border-radius: 100px;
		font-family: var(--font-headline);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 1.2px;
		width: fit-content;
	}

	.status-success {
		background: var(--color-success-bg);
		color: var(--color-success);
	}

	.status-warning {
		background: var(--color-warning-bg);
		color: var(--color-warning);
	}

	.status-error {
		background: var(--color-error-bg);
		color: var(--color-error);
	}

	:global(.score-title), :global(.score-title *) {
		color: var(--color-white) !important;
		font-size: var(--text-2xl) !important;
		line-height: 1.15 !important;
		margin: 0 !important;
	}

	.score-desc {
		color: var(--color-text-secondary);
		font-size: var(--text-base);
		line-height: 1.5;
		font-family: var(--font-body);
	}

	:global(.site-details) {
		padding: 33px !important;
		display: flex !important;
		flex-direction: column !important;
		gap: 24px !important;
	}

	.details-header {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.details-label {
		color: var(--color-text-secondary);
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	:global(.details-url), :global(.details-url *) {
		color: var(--color-white) !important;
		font-size: var(--text-xl) !important;
		line-height: 1.5 !important;
		margin: 0 !important;
		word-break: break-word;
		overflow-wrap: anywhere;
	}

	.details-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;
	}

	.details-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 13px;
		color: var(--color-text-secondary);
		font-size: var(--text-base);
	}

	.details-row:not(:first-child) {
		border-top: none;
		padding-top: 0;
	}

	.details-row strong {
		color: var(--color-white);
		font-weight: 600;
	}

	/* --- Styles for the 4-card grid --- */
	.section-perfoscores {
		display: flex;
		flex-direction: column;
		gap: 32px;
		padding: 24px 0;
		width: 100%;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
	}

	:global(.icon-accent) {
		color: var(--color-accent-primary) !important;
	}
	:global(.icon-accent svg) {
		stroke: var(--color-accent-primary) !important;
		color: var(--color-accent-primary) !important;
	}

	.section-title {
		flex: 1;
		color: var(--color-white);
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 600;
		margin: 0;
	}

	.section-site {
		color: var(--color-text-secondary);
		font-family: var(--font-body);
		font-size: var(--text-xs);
		letter-spacing: 0.08em;
		text-align: right;
	}

	.scores-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
		width: 100%;
	}

	.score-item-card {
		background: var(--color-surface-base);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 28px;
		padding: 32px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		position: relative;
	}

	.circular-chart {
		width: 108px;
		height: 108px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 6px solid var(--color-accent-primary); /* Default / warning color */
		box-shadow: inset 0 0 0 4px rgba(255, 255, 255, 0.05);
	}

	.circular-chart.color-success {
		border-color: var(--color-success);
	}

	.circular-chart.color-warning {
		border-color: var(--color-warning);
	}

	.circular-chart.color-error {
		border-color: var(--color-error);
	}

	/* Tint the number to match its ring color */
	.circular-chart.color-success .chart-value { color: var(--color-success); }
	.circular-chart.color-warning .chart-value { color: var(--color-warning); }
	.circular-chart.color-error .chart-value   { color: var(--color-error); }

	.chart-value {
		color: var(--color-white);
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		line-height: 1;
	}

	.chart-label {
		color: var(--color-white);
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 600;
	}

	/* ── Sprint R2: Mobile Responsive ── */
	@media (max-width: 768px) {
		.section-perfodigital {
			flex-direction: column;
			gap: 20px;
		}

		:global(.score-card) {
			min-width: unset !important;
			width: 100% !important;
		}

		:global(.main-score) {
			flex-direction: column !important;
			align-items: center !important;
			text-align: center !important;
			gap: 24px !important;
		}

		.score-details {
			align-items: center;
		}

		:global(.score-title), :global(.score-title *) {
			text-align: center !important;
		}

		.score-desc {
			text-align: center;
		}

		.scores-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.score-item-card {
			padding: 24px 0;
		}

		.circular-chart {
			width: 96px;
			height: 96px;
		}

		.chart-value {
			font-size: 32px;
		}
	}
</style>
