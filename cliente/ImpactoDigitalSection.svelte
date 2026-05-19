<script lang="ts">
	import IconLeaf from "~icons/ph/leaf";
	import IconServerBroken from "~icons/ph/cloud-x";
	import IconCheck from "~icons/ph/check-circle";

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
			<div class="status-label {impact.co2Class === 'A' || impact.co2Class === 'B' ? 'status-success' : 'status-warning'}">
				{impact.co2Class}
			</div>
			<h2 class="metric-value">{impact.co2Class}</h2>
			<div class="metric-text">
				<strong class="metric-name">Clase digital CO₂</strong>
				<p class="metric-desc">Tu sitio tiene una calificación buena. Basado en el modelo de Sustainable Web Design.</p>
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
			<div class="status-label status-success">
				Bajo impacto
			</div>
			<div class="metric-value-group">
				<h2 class="metric-value">{impact.carbonFootprint}</h2>
				<span class="metric-unit">CO₂/Visita</span>
			</div>
			<div class="metric-text">
				<strong class="metric-name">Huella de carbono</strong>
				<p class="metric-desc">Tu sitio genera {impact.carbonFootprint} de CO₂ por cada visita a tu página.</p>
			</div>
		</div>

		<!-- Green Hosting -->
		<div class="metric-card">
			<div class="status-label {impact.greenHosting ? 'status-success' : 'status-error'}">
				{impact.greenHosting ? 'Certificado' : 'No certificado'}
			</div>
			<div class="metric-value-group">
				{#if impact.greenHosting}
					<IconCheck width="40" height="40" class="icon-success" />
					<h2 class="metric-value-small">Detectado</h2>
				{:else}
					<IconServerBroken width="40" height="40" class="icon-error" />
					<h2 class="metric-value-small">No detectado</h2>
				{/if}
			</div>
			<div class="metric-text">
				<strong class="metric-name">Green Hosting</strong>
				<p class="metric-desc">
					{impact.greenHosting 
						? 'Tu sitio web está alojado en un servidor certificado que consume energía renovable.' 
						: 'Tu sitio web no está alojado en un servidor certificado que consume energía renovable.'}
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
					<div class="status-label {issue.type === 'error' ? 'status-error' : 'status-warning'}">
						<!-- Icon placeholder if needed -->
					</div>
					<div class="issue-text">
						<strong class="issue-name">{issue.title}</strong>
						<span class="issue-impact">{issue.impact}</span>
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

	.metrics-grid {
		display: flex;
		gap: 20px;
		width: 100%;
	}

	.metric-card {
		background: #191e31;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 28px;
		padding: 33px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex: 1;
		min-width: 316px;
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
		color: #d4d8e4;
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
		background: rgba(78, 170, 85, 0.2);
		color: #61d46a;
	}

	.status-warning {
		background: rgba(195, 149, 30, 0.2);
		color: #f3ba25;
	}

	.status-error {
		background: rgba(220, 53, 69, 0.2);
		color: #ff6b6b;
	}
	
	:global(.icon-error) {
		color: #ff6b6b;
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
		color: #d4d8e4;
		font-family: var(--font-headline);
		font-weight: 600;
		font-size: var(--text-sm);
	}

	.class-block.active {
		background: var(--color-audit-accent);
		color: var(--color-audit-bg);
		transform: scale(1.1);
		box-shadow: 0 0 12px rgba(214, 244, 122, 0.4);
		z-index: 1;
	}

	/* Issues Card */
	.issues-card {
		background: #191e31;
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
		color: #d4d8e4;
		font-size: var(--text-xs);
	}

	.issues-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}

	.issue-item {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 16px;
		padding: 16px;
		display: flex;
		gap: 12px;
		align-items: flex-start;
	}

	.issue-item .status-label {
		padding: 6px;
		border-radius: 50%;
		width: 8px;
		height: 8px;
		min-width: unset;
		margin-top: 4px;
	}

	.issue-text {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.issue-name {
		color: var(--color-white);
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 600;
	}

	.issue-impact {
		color: #d4d8e4;
		font-size: var(--text-sm);
	}

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
