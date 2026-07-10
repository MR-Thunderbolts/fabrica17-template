/**
 * @script clean-template.ts
 * @description Script de automatización premium de un solo clic.
 * Convierte el repositorio duplicado en un template de Fábrica Base limpio,
 * eliminando todos los archivos del cliente actual (sea cual sea), reseteando
 * la capa de tokens a una paleta neutra y configurando el entrypoint de demo.
 *
 * Enfoque genérico: en vez de listar los archivos del cliente a borrar (frágil,
 * se desactualiza con cada cliente), se declara el NÚCLEO GENÉRICO a conservar
 * y se elimina todo lo demás dentro de cliente/ y src/routes/.
 */

import { writeFileSync, readFileSync, rmSync, existsSync, readdirSync, lstatSync } from 'fs';
import { join } from 'path';

const CLIENTE_DIR = join(process.cwd(), 'cliente');
const ROUTES_DIR = join(process.cwd(), 'src', 'routes');
const PACKAGE_JSON_PATH = join(process.cwd(), 'package.json');

// Núcleo genérico de la fábrica: sobrevive a la limpieza. Todo lo demás en cliente/ se elimina.
const GENERIC_CORE_KEEP = new Set([
	'BadgePill.svelte',
	'Tooltip.svelte',
	'SkeletonCard.svelte',
	'PageLoadingOverlay.svelte',
	'reveal.ts',
	'tokens.css',
	'assets'
]);

// Archivos raíz de src/routes que conserva el template (los subdirectorios de rutas
// del cliente se eliminan completos).
const ROUTES_KEEP = new Set(['+error.svelte', '+layout.svelte', '+layout.ts', '+page.svelte']);

// Capa de tokens neutra del template: sistema genérico (tipografía, spacing, motion)
// + paleta placeholder sin marca. Se reemplaza al montar un cliente nuevo
// (manual o vía `bun run tokens:sync` desde Figma Variables).
const NEUTRAL_TOKENS_CONTENT = `/* ─── Fábrica Base — Design Tokens (NEUTROS) ─────────────── */
/* Paleta placeholder sin marca. Reemplazar con los tokens del cliente. */

:root {
	/* Typography — stack de sistema, sin dependencias externas */
	--font-headline: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	--font-body:     -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	--font-mono:     ui-monospace, 'SF Mono', Menlo, monospace;

	/* ── Type Scale (Major Third 1.25) ── */
	--text-xs:   clamp(0.7rem, 0.68rem + 0.1vw, 0.75rem);
	--text-sm:   clamp(0.8rem, 0.77rem + 0.15vw, 0.875rem);
	--text-base: 1rem;
	--text-lg:   clamp(1.15rem, 1.05rem + 0.5vw, 1.25rem);
	--text-xl:   clamp(1.4rem, 1.2rem + 1vw, 1.5rem);
	--text-2xl:  clamp(1.75rem, 1.4rem + 1.75vw, 2.5rem);
	--text-3xl:  clamp(2rem, 1.5rem + 2.5vw, 3rem);
	--text-hero: clamp(2.75rem, 1.8rem + 4.75vw, 5rem);

	/* ── Spacing (8px base) ── */
	--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
	--space-4: 16px;  --space-5: 20px;  --space-6: 24px;
	--space-8: 32px;  --space-10: 40px; --space-12: 48px;
	--space-16: 64px; --space-20: 80px; --space-24: 96px;

	/* Section rhythm (vertical padding) */
	--section-pad-sm: clamp(48px, 6vw, 72px);
	--section-pad-md: clamp(64px, 8vw, 88px);
	--section-pad-lg: clamp(72px, 9vw, 96px);

	/* Radius */
	--radius-sm:   7px;
	--radius-md:   10px;
	--radius-lg:   16px;
	--radius-xl:   28px;
	--radius-full: 9999px;

	/* ── Paleta Neutra (dark-first, acento violeta placeholder) ── */
	/* Backgrounds */
	--color-bg-deep:       #0D0E12;
	--color-bg-dark:       #14161D;
	--color-bg-base:       #0D0E12;
	--color-bg-light:      #F5F5F7;

	/* Surfaces */
	--color-surface-base:  #171922;
	--color-surface-dark:  #10121A;

	/* Primary / Accent */
	--color-primary:       #A78BFA;
	--color-primary-hover: #C4B0FF;
	--color-on-primary:    #0D0E12;
	--color-accent-primary:#818CF8;
	--color-white:         #FFFFFF;

	/* Text */
	--color-text-dark:     #E8EAF2;
	--color-text-body:     #A9AEC0;
	--color-text-light:    #FEFFFB;
	--color-text-muted:    #7C8194;
	--color-text-primary:  #E8EAF2;
	--color-text-secondary:#A9AEC0;

	/* Borders */
	--color-border-tag:    rgba(167, 139, 250, 0.35);
	--color-border-card:   rgba(169, 174, 192, 0.16);
	--color-border-outline:#3A3E4E;

	/* Semantic Status */
	--color-success:       #4ADE80;
	--color-success-glow:  rgba(74, 222, 128, 0.4);
	--color-success-bg:    rgba(74, 222, 128, 0.12);
	--color-success-border:rgba(74, 222, 128, 0.28);
	--color-on-success:    #0D0E12;
	--color-warning:       #F3BA25;
	--color-warning-bg:    rgba(195, 149, 30, 0.2);
	--color-error:         #FF6B6B;
	--color-error-bg:      rgba(220, 53, 69, 0.15);

	/* ── Layout ── */
	--content-max: 1132px;
	--gutter: clamp(20px, 12.5vw, 190px);

	/* ── Motion Tokens ── */
	--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
	--ease-in-expo:   cubic-bezier(0.7, 0, 0.84, 0);
	--ease-in-out:    cubic-bezier(0.65, 0, 0.35, 1);

	--dur-instant: 100ms;
	--dur-fast:    200ms;
	--dur-normal:  300ms;
	--dur-slow:    500ms;
	--dur-enter:   600ms;
}

/* ─── Base Reset ─────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
	font-family: var(--font-body);
	font-size: 16px;
	line-height: 1.5;
	-webkit-font-smoothing: antialiased;
	font-kerning: normal;
	font-optical-sizing: auto;
}

body {
	background: var(--color-bg-base);
	color: var(--color-text-body);
	min-height: 100vh;
	line-height: 1.55;
	letter-spacing: 0.01em;
}

/* ─── Typography Polish ─────────────────────────────────── */
h1, h2, h3, h4 { text-wrap: balance; font-family: var(--font-headline); color: var(--color-text-dark); }
article p, .prose p { text-wrap: pretty; }

img, video, svg { display: block; max-width: 100%; }
button { cursor: pointer; font-family: inherit; }

/* Touch & Interaction */
button, a, input, select, textarea { touch-action: manipulation; }

/* Accessibility */
:focus-visible {
	outline: 2px solid var(--color-primary);
	outline-offset: 2px;
	border-radius: 4px;
}

/* ─── Scroll Reveal Animations ──────────────────────────── */
.reveal-fade-up {
	opacity: 0;
	transform: translateY(24px);
	transition:
		opacity var(--dur-enter) var(--ease-out-expo),
		transform var(--dur-enter) var(--ease-out-expo);
}

.reveal-fade-up.revealed {
	opacity: 1;
	transform: translateY(0);
}

.stagger-children > .reveal-fade-up:nth-child(1) { transition-delay: 0ms; }
.stagger-children > .reveal-fade-up:nth-child(2) { transition-delay: 80ms; }
.stagger-children > .reveal-fade-up:nth-child(3) { transition-delay: 160ms; }
.stagger-children > .reveal-fade-up:nth-child(4) { transition-delay: 240ms; }
.stagger-children > .reveal-fade-up:nth-child(5) { transition-delay: 320ms; }

/* ─── UX/UI Pro Max Utilities ───────────────────────────── */
.shadow-elevation-1 {
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
.shadow-elevation-2 {
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
}
.shadow-elevation-3 {
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

@keyframes pulse-skeleton {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.5; }
}

.skeleton-box {
	background: linear-gradient(90deg, rgba(200,200,200,0.1) 0%, rgba(200,200,200,0.2) 50%, rgba(200,200,200,0.1) 100%);
	background-size: 200% 100%;
	animation: shimmer 2s infinite linear;
	border-radius: var(--radius-md);
}

@keyframes shimmer {
	0% { background-position: -200% 0; }
	100% { background-position: 200% 0; }
}

@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
	.reveal-fade-up {
		opacity: 1 !important;
		transform: none !important;
	}
}
`;

// Layout raíz del template: sin logo de cliente (PageLoadingOverlay usa su fallback neutro).
const LAYOUT_CONTENT = `<script lang="ts">
	import "../app.css";
	import "../../cliente/tokens.css";
	import type { Snippet } from "svelte";
	import PageLoadingOverlay from "../../cliente/PageLoadingOverlay.svelte";

	let { children }: { children: Snippet } = $props();
</script>

<PageLoadingOverlay />
{@render children()}
`;

// Entrada del index demo premium
const DEMO_PAGE_CONTENT = `<script lang="ts">
	import BadgePill from "../../cliente/BadgePill.svelte";
	import Tooltip from "../../cliente/Tooltip.svelte";
	import SkeletonCard from "../../cliente/SkeletonCard.svelte";
	import PageLoadingOverlay from "../../cliente/PageLoadingOverlay.svelte";
	import IconSparkles from "~icons/mynaui/sparkles";
	import IconRocket from "~icons/mynaui/rocket";
	import IconLayers from "~icons/lucide/layers";
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
			Esta es la página de inicio del template base. Los archivos específicos del cliente anterior se han desacoplado con éxito. Ahora puedes usar este repo para construir experiencias ultra-rápidas en minutos.
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
					Píldoras y globos informativos accesibles y calibrados con contraste óptimo.
				</p>
				<div class="demo-box" style="gap: 12px;">
					<BadgePill color="var(--color-accent-primary)">
						{#snippet children()}
							<span>Badge con información</span>
						{/snippet}
					</BadgePill>
					<Tooltip title="Información" description="Este es un tooltip interactivo con detalles adicionales." />
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
	console.log("🧹 Iniciando limpieza y desacople del cliente actual...");

	// 1. Eliminar todo lo que no sea núcleo genérico dentro de cliente/
	console.log("📁 Eliminando componentes específicos del cliente...");
	let filesDeletedCount = 0;
	if (existsSync(CLIENTE_DIR)) {
		readdirSync(CLIENTE_DIR).forEach((entry) => {
			if (GENERIC_CORE_KEEP.has(entry)) return;
			rmSync(join(CLIENTE_DIR, entry), { recursive: true, force: true });
			filesDeletedCount++;
		});
	}
	console.log(`✅ Se eliminaron ${filesDeletedCount} archivos del cliente.`);

	// 2. Eliminar rutas específicas del cliente (todos los subdirectorios de src/routes)
	if (existsSync(ROUTES_DIR)) {
		readdirSync(ROUTES_DIR).forEach((entry) => {
			const entryPath = join(ROUTES_DIR, entry);
			if (lstatSync(entryPath).isDirectory() || !ROUTES_KEEP.has(entry)) {
				console.log(`📁 Eliminando ruta de cliente: src/routes/${entry}...`);
				rmSync(entryPath, { recursive: true, force: true });
			}
		});
	}

	// 3. Resetear la capa de tokens a la paleta neutra del template
	console.log("🎨 Reseteando cliente/tokens.css a paleta neutra...");
	writeFileSync(join(CLIENTE_DIR, 'tokens.css'), NEUTRAL_TOKENS_CONTENT, 'utf-8');
	console.log("✅ Tokens neutros escritos (sin marca de cliente).");

	// 4. Reemplazar entrypoints con el demo limpio
	console.log("📄 Reemplazando entrypoints con demo de la fábrica...");
	writeFileSync(join(ROUTES_DIR, '+page.svelte'), DEMO_PAGE_CONTENT, 'utf-8');
	writeFileSync(join(ROUTES_DIR, '+layout.svelte'), LAYOUT_CONTENT, 'utf-8');
	console.log("✅ src/routes/+page.svelte y +layout.svelte actualizados con éxito.");

	// 5. Actualizar package.json
	if (existsSync(PACKAGE_JSON_PATH)) {
		console.log("📄 Actualizando package.json del template...");
		const pkg = JSON.parse(readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
		pkg.name = "fabrica17-template";
		pkg.description = "Template base premium para proyectos de la agencia. Incluye sistema de diseño, utilidades globales, componentes interactivos y governance.";
		pkg.version = "1.0.0";

		// Remover scripts que no correspondan
		delete pkg.scripts["check:factory"];

		writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2) + "\n", 'utf-8');
		console.log("✅ package.json configurado como template.");
	}

	// 6. Vaciar cliente/assets e incluir un placeholder
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
