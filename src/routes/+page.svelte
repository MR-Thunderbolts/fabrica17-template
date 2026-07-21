<script lang="ts">
	import BadgePill from "../../cliente/BadgePill.svelte";
	import Tooltip from "../../cliente/Tooltip.svelte";
	import SkeletonCard from "../../cliente/SkeletonCard.svelte";
	import IconSparkles from "~icons/mynaui/sparkles";
	import IconRocket from "~icons/mynaui/rocket";
	import IconLayers from "~icons/mynaui/layers-three";
	import IconArrowRight from "~icons/mynaui/arrow-right";
</script>

<div class="template-container">
	<main class="hero-section">
		<div class="header-pill">
			<BadgePill>
				{#snippet icon()}
					<IconSparkles style="width: 14px; height: 14px;" />
				{/snippet}
				{#snippet children()}
					<span>Fábrica17 — Template Activo</span>
				{/snippet}
			</BadgePill>
		</div>

		<h1 class="title">Fábrica de Componentes de Alto Rendimiento</h1>
		<p class="subtitle">
			Esta es la página de inicio del template base. El sistema de diseño arranca en escala de
			grises neutra: inyecta la identidad del cliente en <code>cliente/tokens.css</code> y
			construye experiencias ultra-rápidas en minutos.
		</p>

		<div class="cta-group">
			<a href="./CLIENTE_SETUP.md" class="btn btn-primary">
				Guía de Setup
				<IconArrowRight style="width: 18px; height: 18px;" />
			</a>
			<a href="https://github.com/MR-Thunderbolts/fabrica17" class="btn btn-secondary" target="_blank">
				Ver Repositorio
			</a>
		</div>
	</main>

	<!-- Design System Showcase -->
	<section class="showcase-section">
		<h2 class="section-title">Componentes Genéricos del Core</h2>
		<p class="section-subtitle">
			Elementos con animaciones fluidas, estados de carga y rendimiento de nivel impecable
			incluidos en la base.
		</p>

		<div class="grid">
			<!-- Card 1: BadgePill & Tooltip -->
			<div class="card">
				<div class="card-icon">
					<IconLayers />
				</div>
				<h3 class="card-title">BadgePill & Tooltip</h3>
				<p class="card-desc">
					Píldoras y globos informativos accesibles, tematizados por tokens semánticos.
				</p>
				<div class="demo-box">
					<BadgePill>
						{#snippet children()}
							<span>Badge con Tooltip</span>
						{/snippet}
					</BadgePill>
					<Tooltip
						title="Tooltip interactivo"
						description="Este es un tooltip accesible que consume la capa semántica de tokens."
					/>
				</div>
			</div>

			<!-- Card 2: Skeleton Loader -->
			<div class="card">
				<div class="card-icon">
					<IconSparkles />
				</div>
				<h3 class="card-title">Shimmer Loading State</h3>
				<p class="card-desc">
					Esqueletos de carga súper optimizados para evitar saltos acumulativos de diseño (CLS).
				</p>
				<div class="demo-box">
					<SkeletonCard height="80px" borderRadius="var(--radius-md)" />
				</div>
			</div>

			<!-- Card 3: Performance Ready -->
			<div class="card">
				<div class="card-icon">
					<IconRocket />
				</div>
				<h3 class="card-title">Rendimiento Impecable</h3>
				<p class="card-desc">
					Configuración de renderizado estático listo para SEO con 100/100 en Google PageSpeed.
				</p>
				<div class="demo-box status-indicator">
					<span class="status-dot"></span>
					Listo para Producción
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.template-container {
		position: relative;
		width: 100%;
		min-height: 100vh;
		background: var(--color-neutral-bg);
		color: var(--color-text-primary);
		font-family: var(--font-body);
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 120px var(--gutter) var(--space-24) var(--gutter);
	}

	.hero-section {
		position: relative;
		z-index: 1;
		max-width: 800px;
		text-align: center;
		margin-bottom: var(--space-20);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-6);
	}

	.header-pill {
		margin-bottom: var(--space-2);
	}

	.title {
		font-family: var(--font-headline);
		font-size: var(--text-3xl);
		font-weight: 700;
		line-height: 1.15;
		color: var(--color-text-heading);
	}

	.subtitle {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: 1.6;
		max-width: 680px;
	}

	.subtitle code {
		font-family: var(--font-mono);
		font-size: 0.85em;
		background: var(--color-surface-muted);
		border: 1px solid var(--color-border-card);
		border-radius: var(--radius-sm);
		padding: 1px 6px;
	}

	.cta-group {
		display: flex;
		gap: var(--space-4);
		margin-top: var(--space-4);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		border-radius: var(--radius-full);
		font-weight: 600;
		font-size: var(--text-sm);
		text-decoration: none;
		transition: all var(--dur-fast) var(--ease-in-out);
	}

	.btn-primary {
		background: var(--color-primary);
		color: var(--color-primary-foreground);
	}
	.btn-primary:hover {
		background: var(--color-primary-hover);
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: var(--color-surface-base);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-card);
	}
	.btn-secondary:hover {
		background: var(--color-surface-muted);
		transform: translateY(-2px);
	}

	.showcase-section {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: var(--content-max);
		margin-top: var(--space-10);
		border-top: 1px solid var(--color-border-card);
		padding-top: var(--space-20);
		text-align: center;
	}

	.section-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		color: var(--color-text-heading);
		margin-bottom: var(--space-3);
	}

	.section-subtitle {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-width: 600px;
		margin: 0 auto var(--space-12) auto;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-6);
		width: 100%;
	}

	.card {
		background: var(--color-surface-base);
		border: 1px solid var(--color-border-card);
		border-radius: var(--radius-lg);
		padding: var(--space-8);
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		transition: all var(--dur-fast) var(--ease-in-out);
	}
	.card:hover {
		border-color: var(--color-border-outline);
		transform: translateY(-4px);
		box-shadow: var(--shadow-md);
	}

	.card-icon {
		background: var(--color-surface-muted);
		color: var(--color-text-primary);
		width: 48px;
		height: 48px;
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
	}

	.card-title {
		font-family: var(--font-headline);
		font-size: var(--text-xl);
		color: var(--color-text-heading);
	}

	.card-desc {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.5;
	}

	.demo-box {
		margin-top: auto;
		background: var(--color-bg-deep);
		border-radius: var(--radius-md);
		padding: var(--space-4);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
		min-height: 80px;
	}

	.status-indicator {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-success);
	}

	.status-dot {
		width: 8px;
		height: 8px;
		background: var(--color-success);
		border-radius: var(--radius-full);
		box-shadow: 0 0 8px var(--color-success-glow);
	}
</style>
