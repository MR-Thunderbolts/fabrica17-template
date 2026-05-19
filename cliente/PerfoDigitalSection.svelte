<script lang="ts">
	import IconGlobe from "~icons/ph/globe";

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
		<div class="score-circle-wrapper">
			<div class="score-circle">
				{scores.main}
			</div>
		</div>
		<div class="score-details">
			<div class="status-label {scores.status === 'Optimo' ? 'status-success' : 'status-warning'}">
				{scores.status}
			</div>
			<h4 class="score-title">
				Tu sitio puede<br>rendir mucho mejor
			</h4>
			<p class="score-desc">
				Este score refleja el rendimiento real de tu sitio considerando velocidad, interacción, estabilidad y eficiencia digital.
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
				<strong>Gratuita</strong>
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
		<h3 class="section-title">Performance digital</h3>
		<span class="section-site">{url}</span>
	</div>
	
	<div class="scores-grid">
		<!-- Rendimiento -->
		<div class="score-item-card">
			<div class="circular-chart {getScoreColorClass(scores.performance)}">
				<span class="chart-value">{scores.performance}</span>
			</div>
			<span class="chart-label">Rendimiento</span>
		</div>
		<!-- Calidad -->
		<div class="score-item-card">
			<div class="circular-chart {getScoreColorClass(scores.quality)}">
				<span class="chart-value">{scores.quality}</span>
			</div>
			<span class="chart-label">Calidad</span>
		</div>
		<!-- Eficiencia -->
		<div class="score-item-card">
			<div class="circular-chart {getScoreColorClass(scores.efficiency)}">
				<span class="chart-value">{scores.efficiency}</span>
			</div>
			<span class="chart-label">Eficiencia</span>
		</div>
		<!-- Satisfacción -->
		<div class="score-item-card">
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
		background: #191e31 !important;
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
		background: rgba(222, 246, 149, 0.22);
		backdrop-filter: blur(2px);
		border: 8px solid var(--color-audit-accent);
		box-shadow: 0px 0px 16px 0px var(--color-audit-accent);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.score-circle {
		font-family: var(--font-headline);
		font-weight: 700;
		font-size: 60px;
		line-height: 72px;
		color: var(--color-audit-accent);
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
		background: rgba(78, 170, 85, 0.2);
		color: #61d46a;
	}

	.status-warning {
		background: rgba(195, 149, 30, 0.2);
		color: #f3ba25;
	}

	:global(.score-title), :global(.score-title *) {
		color: var(--color-white) !important;
		font-size: var(--text-2xl) !important;
		line-height: 1.15 !important;
		margin: 0 !important;
	}

	.score-desc {
		color: #d4d8e4;
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
		color: #d4d8e4;
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
		color: #d4d8e4;
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
		color: var(--color-audit-accent) !important;
	}
	:global(.icon-accent svg) {
		stroke: var(--color-audit-accent) !important;
		color: var(--color-audit-accent) !important;
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
		color: #d4d8e4;
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
		background: #191e31;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 28px;
		padding: 32px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
	}

	.circular-chart {
		width: 108px;
		height: 108px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 6px solid var(--color-audit-accent); /* Default / warning color */
		box-shadow: inset 0 0 0 4px rgba(255, 255, 255, 0.05);
	}

	.circular-chart.color-success {
		border-color: #61d46a;
	}

	.circular-chart.color-warning {
		border-color: var(--color-audit-accent);
	}

	.circular-chart.color-error {
		border-color: #ff6b6b;
	}

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
