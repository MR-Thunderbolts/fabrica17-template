<script lang="ts">
	import IconLeaf from "~icons/mynaui/leaf";
	import IconServerBroken from "~icons/mynaui/cloud-off";
	import IconCheck from "~icons/mynaui/check-circle";
	import Tooltip from "./Tooltip.svelte";

	let { url, impact, issues } = $props<{
		url: string;
		impact: {
			co2Class: string;
			carbonFootprint: string;
			greenHosting: boolean;
		};
		issues: Array<{
			title: string;
			impact: string;
			type: string;
		}>;
	}>();

	const classes = ['A', 'B', 'C', 'D', 'E', 'F'];

	function getStatus(grade: string) {
		if (grade === 'A' || grade === 'B') return 'ÓPTIMO';
		if (grade === 'C' || grade === 'D') return 'MEJORABLE';
		return 'DEFICIENTE';
	}

	function getStatusClass(status: string) {
		if (status === 'ÓPTIMO') return 'status-success';
		if (status === 'MEJORABLE') return 'status-warning';
		return 'status-error';
	}

	let co2Status = $derived(getStatus(impact.co2Class));
	let co2StatusClass = $derived(getStatusClass(co2Status));
	
	let greenStatus = $derived(impact.greenHosting ? 'ÓPTIMO' : 'DEFICIENTE');
	let greenStatusClass = $derived(getStatusClass(greenStatus));
</script>

<section class="section-impactodigital">
	<div class="section-header">
		<IconLeaf width="20" height="20" class="icon-accent" />
		<h3 class="section-title">Impacto Digital</h3>
		<span class="section-site">{url}</span>
	</div>
	
	<div class="metrics-grid">
		<!-- Clase Digital CO2 -->
		<div class="metric-card">
			<div class="status-label {co2StatusClass}">
				{co2Status}
			</div>
			<h2 class="metric-value">{impact.co2Class}</h2>
			<div class="metric-text">
				<div class="metric-name-row">
					<strong class="metric-name">Clase digital CO₂</strong>
					<Tooltip title="Clase Digital CO₂" description="Tu sitio recibió la clase {impact.co2Class}. Las clases van de A (más eficiente) a F (más contaminante). Esta calificación refleja cuánta energía consume tu sitio por visita según el modelo Sustainable Web Design." absolute={true} />
				</div>
				<p class="metric-desc">
					{#if co2Status === 'ÓPTIMO'}
						Tu sitio tiene una clasificación eficiente según el modelo Sustainable Web Design.
					{:else if co2Status === 'MEJORABLE'}
						Tu sitio tiene clasificación regular. Hay oportunidades de mejora ambiental.
					{:else}
						Tu sitio requiere optimización urgente según el modelo Sustainable Web Design.
					{/if}
				</p>
			</div>
			<div class="class-scale">
				{#each classes as cls}
					<div class="class-block {cls === impact.co2Class ? 'active' : ''}">
						{cls}
					</div>
				{/each}
			</div>
		</div>

		<!-- Huella de Carbono -->
		<div class="metric-card">
			<div class="status-label {co2StatusClass}">
				{co2Status}
			</div>
			<div class="metric-value-group">
				<h2 class="metric-value">{impact.carbonFootprint}</h2>
				<span class="metric-unit">CO₂/Visita</span>
			</div>
			<div class="metric-text">
				<strong class="metric-name">Huella de carbono</strong>
				<p class="metric-desc">Tu sitio emite {impact.carbonFootprint} de CO₂ por cada visita.</p>
			</div>
			{#if co2Status === 'ÓPTIMO'}
				<div class="status-label status-success badge-small" style="display: inline-flex; gap: 6px; margin-top: auto;">
					<IconLeaf width="12" height="12" /> Más limpio que el 66% de la web
				</div>
			{:else if co2Status === 'MEJORABLE'}
				<div class="status-label status-warning badge-small" style="display: inline-flex; gap: 6px; margin-top: auto;">
					<IconLeaf width="12" height="12" /> Promedio de la web
				</div>
			{/if}
		</div>

		<!-- Green Hosting -->
		<div class="metric-card">
			<div class="status-label {greenStatusClass}">
				{greenStatus}
			</div>
			<div class="metric-value-group">
				{#if impact.greenHosting}
					<IconCheck width="40" height="40" class="icon-success" />
					<h2 class="metric-value-small">Detectado</h2>
				{:else}
					<h2 class="metric-value">No detectado</h2>
				{/if}
			</div>
			<div class="metric-text">
				<strong class="metric-name">Green Hosting</strong>
				<p class="metric-desc">
					{impact.greenHosting 
						? 'Tu sitio está alojado en un servidor certificado de energía renovable.' 
						: 'Tu sitio no está alojado en un servidor de energía renovable certificado.'}
				</p>
			</div>
		</div>
	</div>

	<!-- Problemas Detectados -->
	<div class="issues-card">
		<div class="issues-header">
			<IconLeaf width="24" height="24" class="icon-accent" />
			<h4 class="issues-title">Problemas detectados</h4>
			<span class="issues-site">{url}</span>
		</div>
		<div class="issues-grid">
			{#each issues as issue}
				<div class="issue-item">
					<div class="issue-dot {issue.type === 'error' ? 'error' : 'warning'}"></div>
					<div class="issue-text">
						<strong class="issue-name">{issue.title}</strong>
						<div class="issue-impact {issue.type === 'error' ? 'error' : 'warning'}">
							{issue.impact}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.section-impactodigital {
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

	.metrics-grid {
		display: flex;
		gap: 20px;
		width: 100%;
	}

	.metric-card {
		background: var(--color-surface-base);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 28px;
		padding: 33px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex: 1;
		min-width: 316px;
		position: relative;
	}

	.metric-value {
		color: var(--color-white);
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		margin: 0;
		line-height: 1.15;
	}

	.metric-value-group {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	
	.metric-value-small {
		color: var(--color-white);
		font-family: var(--font-headline);
		font-size: var(--text-xl);
		font-weight: 700;
		margin: 0;
	}

	.metric-unit {
		color: var(--color-text-secondary);
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 600;
	}

	.metric-text {
		display: flex;
		flex-direction: column;
		gap: 6px;
		flex: 1;
	}

	.metric-name-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.metric-name {
		color: var(--color-white);
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 600;
	}

	.metric-desc {
		color: var(--color-text-secondary);
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

	.status-error {
		background: var(--color-error-bg);
		color: var(--color-error);
	}
	
	:global(.icon-error) {
		color: var(--color-error);
	}

	/* CO2 Scale */
	.class-scale {
		display: flex;
		gap: 4px;
		margin-top: auto;
		padding-top: 16px;
	}

	.class-block {
		flex: 1;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 6px;
		color: var(--color-text-secondary);
		font-family: var(--font-headline);
		font-weight: 600;
		font-size: var(--text-sm);
	}

	.class-block.active {
		background: var(--color-accent-primary);
		color: var(--color-bg-base);
		transform: scale(1.1);
		box-shadow: 0 0 12px rgba(214, 244, 122, 0.4);
		z-index: 1;
	}

	/* Issues Card */
	.issues-card {
		background: var(--color-surface-base);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 28px;
		padding: 33px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
	}

	.issues-header {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.issues-title {
		flex: 1;
		color: var(--color-white);
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 600;
		margin: 0;
	}

	.issues-site {
		color: var(--color-text-secondary);
		font-size: var(--text-xs);
	}

	.issues-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}

	.badge-small {
		font-size: 10px;
		padding: 4px 10px;
		white-space: nowrap;
		letter-spacing: 0.05em;
	}

	.issue-item {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 20px;
		padding: 16px 20px;
		display: flex;
		flex-direction: row;
		gap: 12px;
		align-items: center;
	}

	.issue-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.issue-dot.error { background: var(--color-error); }
	.issue-dot.warning { background: var(--color-warning); }

	.issue-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.issue-name {
		color: var(--color-white);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 600;
	}

	.issue-impact {
		font-family: var(--font-body);
		font-size: var(--text-xs);
	}
	.issue-impact.error { color: var(--color-error); }
	.issue-impact.warning { color: var(--color-warning); }

	/* ── Sprint R4: Mobile Responsive ── */
	@media (max-width: 768px) {
		.metrics-grid {
			flex-direction: column;
		}

		.metric-card {
			min-width: unset;
			width: 100%;
		}

		.issues-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
