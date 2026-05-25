<script lang="ts">

	import IconGlobe from "~icons/ph/globe";

	let { url, webCore } = $props<{
		url: string;
		webCore: {
			loadTime: string;
			loadTimeStatus: string;
			responseTime: string;
			responseTimeStatus: string;
			visualStability: string;
			visualStabilityStatus: string;
		}
	}>();
</script>

<section class="section-perfowebcore">
	<div class="section-header">
		<IconGlobe width="20" height="20" class="icon-accent" />
		<h3 class="section-title">Performance Web Core</h3>
		<span class="section-site">{url}</span>
	</div>
	<div class="metrics-grid">
		<!-- Velocidad de carga -->
		<div class="metric-card">
			<div class="status-label {webCore.loadTimeStatus === 'Optimo' ? 'status-success' : 'status-warning'}">
				{webCore.loadTimeStatus}
			</div>
			<h2 class="metric-value">{webCore.loadTime}</h2>
			<div class="metric-text">
				<strong class="metric-name">Velocidad de carga</strong>
				<p class="metric-desc">Qué tan rápido tu sitio muestra contenido al usuario.</p>
			</div>
		</div>
		<!-- Tiempo de respuesta -->
		<div class="metric-card">
			<div class="status-label {webCore.responseTimeStatus === 'Optimo' ? 'status-success' : 'status-warning'}">
				{webCore.responseTimeStatus}
			</div>
			<h2 class="metric-value">{webCore.responseTime}</h2>
			<div class="metric-text">
				<strong class="metric-name">Tiempo de respuesta</strong>
				<p class="metric-desc">Cuánto tarda tu sitio en estar listo para usarse.</p>
			</div>
		</div>
		<!-- Estabilidad visual -->
		<div class="metric-card">
			<div class="status-label {webCore.visualStabilityStatus === 'Optimo' ? 'status-success' : 'status-warning'}">
				{webCore.visualStabilityStatus}
			</div>
			<h2 class="metric-value">{webCore.visualStability}</h2>
			<div class="metric-text">
				<strong class="metric-name">Estabilidad visual</strong>
				<p class="metric-desc">Qué tanto se mueven los elementos mientras la página carga.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.section-perfowebcore {
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

	:global(.section-title), :global(.section-title *) {
		flex: 1;
		color: var(--color-white) !important;
		font-family: var(--font-body);
		font-size: var(--text-lg) !important;
		font-weight: 600 !important;
		margin: 0;
	}

	.section-site {
		color: #d4d8e4;
		font-family: var(--font-body);
		font-size: var(--text-xs);
		letter-spacing: 0.08em;
		text-align: right;
	}

	.metrics-grid {
		display: flex;
		gap: 20px;
		width: 100%;
	}

	:global(.metric-card) {
		background: var(--color-surface-base);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 28px;
		padding: 33px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex: 1;
		min-width: 316px;
	}

	:global(.metric-value), :global(.metric-value *) {
		color: var(--color-white) !important;
		font-family: var(--font-headline);
		font-size: var(--text-2xl) !important;
		font-weight: 700 !important;
		margin: 0 !important;
		line-height: 1.15 !important;
	}

	.metric-text {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.metric-name {
		color: var(--color-white);
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 600;
	}

	.metric-desc {
		color: #d4d8e4;
		font-family: var(--font-body);
		font-size: var(--text-base);
		margin: 0;
	}

	.status-label {
		display: inline-flex;
		align-items: center;
		padding: 4px 12px;
		border-radius: 100px;
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
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

	/* ── Sprint R3: Mobile Responsive ── */
	@media (max-width: 768px) {
		.metrics-grid {
			flex-direction: column;
		}

		:global(.metric-card) {
			min-width: unset !important;
			width: 100% !important;
		}
	}
</style>
