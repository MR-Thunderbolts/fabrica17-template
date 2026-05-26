<script lang="ts">
	import IconArrowLeft from "~icons/mynaui/arrow-left";

	let { url, date } = $props<{ url: string; date: string }>();
</script>

<!-- Section 1: Hero -->
<section class="section-hero">
	<div class="hero-top">
		<button type="button" class="btn-volver" onclick={() => history.back()}>
			<IconArrowLeft width="16" height="16" /> Volver al inicio
		</button>
		<span class="report-badge">AUDITORÍA GRATUITA</span>
	</div>
	<h2 class="hero-title">
		Reporte de performance<br>
		<span class="text-accent">&amp;</span> <span class="text-accent">sustentabilidad</span> <span class="text-accent">digital</span>
	</h2>
	<p class="hero-subtitle">
		Sitio web auditado: <strong>{url}</strong> &middot; Fecha: {date}
	</p>
</section>

<style>
	.text-accent {
		color: var(--color-accent-primary);
	}

	.section-hero {
		padding-bottom: 32px;
		padding-top: 24px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		align-items: flex-start;
		width: 100%;
		margin-top: 24px;
	}

	.hero-top {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	:global(.btn-volver) {
		background: transparent !important;
		border: none !important;
		color: var(--color-white) !important;
		border-radius: 0 !important;
		padding: 0 !important;
		font-family: var(--font-body) !important;
		font-size: var(--text-sm) !important;
		font-weight: 600 !important;
		display: flex !important;
		align-items: center !important;
		gap: 8px !important;
		transition: opacity var(--dur-fast) var(--ease-out-expo) !important;
		cursor: pointer;
	}

	:global(.btn-volver:hover) {
		opacity: 0.7 !important;
	}

	.report-badge {
		color: var(--color-bg-base);
		background: var(--color-accent-primary);
		padding: 4px 10px;
		border-radius: var(--radius-full);
		font-family: var(--font-headline);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1.2px;
	}

	:global(.hero-title), :global(.hero-title *) {
		font-size: 40px !important;
		line-height: 40px !important;
		color: var(--color-white) !important;
		margin: 0 !important;
		letter-spacing: -1px !important;
	}

	.hero-subtitle {
		color: #d4d8e4;
		font-family: var(--font-headline);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 1.2px;
	}

	.hero-subtitle strong {
		font-weight: 700;
	}
</style>
