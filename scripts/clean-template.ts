/**
 * @script clean-template.ts
 * @description Script de automatización premium de un solo clic.
 * Convierte el repositorio duplicado en un template de Fábrica Base limpio,
 * eliminando todos los archivos de clientes y configurando el entrypoint de demo.
 */

import { writeFileSync, rmSync, existsSync, readdirSync, lstatSync } from 'fs';
import { join } from 'path';

const CLIENTE_DIR = join(process.cwd(), 'cliente');
const ROUTES_DIR = join(process.cwd(), 'src', 'routes');
const PACKAGE_JSON_PATH = join(process.cwd(), 'package.json');

// Archivos de clientes específicos a eliminar
const CLIENT_FILES_TO_REMOVE = [
	'CalculatorForm.svelte',
	'CalculatorLoading.svelte',
	'FooterSection.svelte',
	'HeroSection.svelte',
	'ImpactoDigitalSection.svelte',
	'LandingAuditModal.svelte',
	'LandingFAQ.svelte',
	'LandingFooter.svelte',
	'LandingHero.svelte',
	'LandingMetodologia.svelte',
	'LandingNav.svelte',
	'LandingOferta.svelte',
	'LandingPage.svelte',
	'LandingPainPoints.svelte',
	'LandingPlan.svelte',
	'LandingQuoteForm.svelte',
	'LandingSeguridad.svelte',
	'PerfoDigitalSection.svelte',
	'PerfoWebCoreSection.svelte',
	'ProximoPasoSection.svelte',
	'ReportPage.svelte',
	'fix_layout.js'
];

// Ruta del reporte específico de Ciclo17
const REPORTE_ROUTE_DIR = join(ROUTES_DIR, 'reporte');

// Entrada del index demo premium
const DEMO_PAGE_CONTENT = `<script lang="ts">
	import BadgePill from "../../cliente/BadgePill.svelte";
	import Tooltip from "../../cliente/Tooltip.svelte";
	import SkeletonCard from "../../cliente/SkeletonCard.svelte";
	import PageLoadingOverlay from "../../cliente/PageLoadingOverlay.svelte";
	import IconSparkles from "~icons/mynaui/sparkles";
	import IconRocket from "~icons/mynaui/rocket";
	import IconLayers from "~icons/mynaui/layers";
	import IconArrowRight from "~icons/mynaui/arrow-right";
	import { onMount } from "svelte";

	let isMounted = $state(false);

	onMount(() => {
		isMounted = true;
	});
</script>

<div class="template-container">
	<!-- Ambient Background Glows -->
	<div class="glow-bg glow-purple"></div>
	<div class="glow-bg glow-blue"></div>

	<main class="hero-section">
		<div class="header-pill">
			<BadgePill color="var(--color-primary)">
				{#snippet icon()}
					<IconSparkles style="width: 14px; height: 14px;" />
				{/snippet}
				{#snippet children()}
					<span>Fábrica Base v1.0.0 — Template Activo</span>
				{/snippet}
			</BadgePill>
		</div>

		<h1 class="title">Diseño de Alto Rendimiento para la Agencia</h1>
		<p class="subtitle">
			Esta es la página de inicio del template base. Los archivos específicos de la landing de Ciclo17 se han desacoplado con éxito. Ahora puedes usar este repo para construir experiencias ultra-rápidas en minutos.
		</p>

		<div class="cta-group">
			<a href="./CLIENTE_SETUP.md" class="btn btn-primary">
				Guía de Setup
				<IconArrowRight style="width: 18px; height: 18px;" />
			</a>
			<a href="https://github.com" class="btn btn-secondary" target="_blank">
				Ver Repositorio
			</a>
		</div>
	</main>

	<!-- Design System Showcase -->
	<section class="showcase-section">
		<h2 class="section-title">Componentes Genéricos del Core</h2>
		<p class="section-subtitle">
			Elementos con animaciones fluidas, estados de carga y rendimiento de nivel impecable incluidos en la base.
		</p>

		<div class="grid">
			<!-- Card 1: BadgePill & Tooltip -->
			<div class="card">
				<div class="card-icon">
					<IconLayers />
				</div>
				<h3 class="card-title">BadgePill & Tooltip</h3>
				<p class="card-desc">
					Píldoras y globos informativos accesibles y calibrados con contraste óptimo en OKLCH.
				</p>
				<div class="demo-box">
					<Tooltip content="Este es un tooltip interactivo">
						<BadgePill color="var(--color-accent-primary)">
							{#snippet children()}
								<span>Hover para ver Tooltip</span>
							{/snippet}
						</BadgePill>
					</Tooltip>
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
		background: var(--color-bg-deep);
		color: var(--color-text-primary);
		font-family: var(--font-body);
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 120px var(--gutter) var(--space-24) var(--gutter);
	}

	/* Glow Backgrounds */
	.glow-bg {
		position: absolute;
		width: 80vw;
		height: 80vh;
		pointer-events: none;
		z-index: 0;
		opacity: 0.8;
		filter: blur(140px);
	}
	.glow-purple {
		top: -10%;
		left: -10%;
		background: radial-gradient(circle, rgba(215, 144, 240, 0.06) 0%, transparent 70%);
	}
	.glow-blue {
		bottom: -10%;
		right: -10%;
		background: radial-gradient(circle, rgba(100, 140, 255, 0.05) 0%, transparent 70%);
	}

	.hero-section {
		position: relative;
		z-index: 1;
		max-width: 800px;
		text-align: center;
		margin-bottom: 80px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}

	.header-pill {
		margin-bottom: 8px;
	}

	.title {
		font-family: var(--font-headline);
		font-size: var(--text-3xl);
		font-weight: 700;
		line-height: 1.15;
		color: var(--color-white);
	}

	.subtitle {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: 1.6;
		max-width: 680px;
	}

	.cta-group {
		display: flex;
		gap: 16px;
		margin-top: 16px;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		border-radius: var(--radius-full);
		font-weight: 600;
		font-size: var(--text-sm);
		text-decoration: none;
		transition: all var(--dur-fast) var(--ease-in-out);
	}

	.btn-primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
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
		background: var(--color-surface-dark);
		transform: translateY(-2px);
	}

	.showcase-section {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: var(--content-max);
		margin-top: 40px;
		border-top: 1px solid var(--color-border-card);
		padding-top: 80px;
		text-align: center;
	}

	.section-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		color: var(--color-white);
		margin-bottom: 12px;
	}

	.section-subtitle {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-width: 600px;
		margin: 0 auto 48px auto;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 24px;
		width: 100%;
	}

	.card {
		background: var(--color-surface-base);
		border: 1px solid var(--color-border-card);
		border-radius: var(--radius-lg);
		padding: 32px;
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: 16px;
		transition: all var(--dur-fast) var(--ease-in-out);
	}
	.card:hover {
		border-color: rgba(215, 144, 240, 0.25);
		transform: translateY(-4px);
	}

	.card-icon {
		background: rgba(215, 144, 240, 0.1);
		color: var(--color-primary);
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
		color: var(--color-white);
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
		padding: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 80px;
	}

	.status-indicator {
		display: inline-flex;
		align-items: center;
		gap: 8px;
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
`;

function clean() {
	console.log("🧹 Iniciando limpieza y desacople de Ciclo17...");

	// 1. Eliminar archivos de clientes específicos
	console.log("📁 Eliminando componentes de cliente específicos...");
	let filesDeletedCount = 0;
	CLIENT_FILES_TO_REMOVE.forEach((filename) => {
		const filePath = join(CLIENTE_DIR, filename);
		if (existsSync(filePath)) {
			rmSync(filePath);
			filesDeletedCount++;
		}
	});
	console.log(`✅ Se eliminaron ${filesDeletedCount} componentes del cliente.`);

	// 2. Eliminar ruta /reporte
	if (existsSync(REPORTE_ROUTE_DIR)) {
		console.log("📁 Eliminando ruta /src/routes/reporte...");
		rmSync(REPORTE_ROUTE_DIR, { recursive: true, force: true });
		console.log("✅ Ruta /reporte eliminada con éxito.");
	}

	// 3. Reemplazar src/routes/+page.svelte con el demo limpio
	const pageSveltePath = join(ROUTES_DIR, '+page.svelte');
	console.log("📄 Reemplazando entrypoint principal con demo de la fábrica...");
	writeFileSync(pageSveltePath, DEMO_PAGE_CONTENT, 'utf-8');
	console.log("✅ src/routes/+page.svelte actualizado con éxito.");

	// 4. Actualizar package.json
	if (existsSync(PACKAGE_JSON_PATH)) {
		console.log("📄 Actualizando package.json del template...");
		const pkg = require(PACKAGE_JSON_PATH);
		pkg.name = "fabrica17-template";
		pkg.description = "Template base premium para proyectos de la agencia. Incluye sistema de diseño, utilidades globales, componentes interactivos y governance.";
		pkg.version = "1.0.0";
		
		// Remover scripts que no correspondan
		delete pkg.scripts["check:factory"];
		
		writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2) + "\n", 'utf-8');
		console.log("✅ package.json configurado como template.");
	}

	// 5. Vaciar cliente/assets e incluir un placeholder
	const assetsDir = join(CLIENTE_DIR, 'assets');
	if (existsSync(assetsDir)) {
		console.log("📁 Limpiando assets del cliente...");
		const files = readdirSync(assetsDir);
		files.forEach((file) => {
			const filePath = join(assetsDir, file);
			if (lstatSync(filePath).isFile()) {
				rmSync(filePath);
			}
		});
		writeFileSync(join(assetsDir, '.gitkeep'), '', 'utf-8');
		console.log("✅ Carpeta cliente/assets/ vaciada con éxito.");
	}

	console.log("\n🎉 ¡MIGRACIÓN COMPLETADA CON ÉXITO! 🎉");
	console.log("Tu repositorio ahora es un template limpio y listo para usarse.");
	console.log("💡 Lee CLIENTE_SETUP.md para saber cómo empezar tu próximo proyecto.");
}

clean();
