<script lang="ts">
	import IconLightning from "~icons/ph/lightning";
	import IconHeart from "~icons/ph/heart";
	import IconDollar from "~icons/ph/currency-dollar";
	import IconGlobe from "~icons/ph/globe";
	import IconArrowRight from "~icons/ph-bold/arrow-right";
	import { reveal } from "./reveal";
	import logoBg from "./assets/Logo_BG.svg?raw";
</script>

<section class="hero-section" use:reveal>
	<!-- Decorative background glow and logo watermark -->
	<div class="hero-bg-gradient"></div>
	<div class="hero-bg-logo">
		{@html logoBg}
	</div>

	<div class="hero-content">
		<!-- Tag pill -->
		<div class="hero-tag-pill">
			<span>PERFORMANCE & SUSTENTABILIDAD DIGITAL</span>
		</div>

		<!-- Main heading -->
		<h1 class="hero-heading">
			Sitios web que<br>
			<span class="accent-green">convierten</span> y<br>
			cuidan el planeta.
		</h1>

		<!-- Subtitle -->
		<p class="hero-subtitle">
			Creamos experiencias digitales que generan más visitas convertidas en clientes,<br>
			lo que a vez logra menor impacto ambiental digital.
		</p>

		<!-- CTA buttons -->
		<div class="hero-cta-group">
			<a href="/reporte" class="btn-primary">
				<span>Ir a auditoría gratuita</span>
				<IconArrowRight width="20" height="20" />
			</a>
			<a href="#cotizar" class="btn-outline">
				Cotizar un sitio web
			</a>
		</div>

		<!-- Benefit tags -->
		<div class="hero-tags">
			<div class="hero-tag-item">
				<div class="tag-badge"><IconLightning width="16" height="16" /></div>
				<span class="tag-label">Más velocidad</span>
			</div>
			<div class="hero-tag-item">
				<div class="tag-badge"><IconHeart width="16" height="16" /></div>
				<span class="tag-label">Mejor experiencia</span>
			</div>
			<div class="hero-tag-item">
				<div class="tag-badge"><IconDollar width="16" height="16" /></div>
				<span class="tag-label">Más conversión</span>
			</div>
			<div class="hero-tag-item">
				<div class="tag-badge"><IconGlobe width="16" height="16" /></div>
				<span class="tag-label">Menos CO₂ por visita</span>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		padding: calc(var(--section-pad-lg) + 40px) var(--gutter) var(--section-pad-md);
		width: 100%;
		scroll-snap-align: start;
	}

	.hero-bg-gradient {
		position: absolute;
		bottom: -220px;
		right: -220px;
		width: 900px;
		height: 900px;
		background: radial-gradient(circle at center, rgba(215, 144, 240, 0.28) 0%, rgba(135, 78, 203, 0.12) 50%, transparent 75%);
		pointer-events: none;
		z-index: 0;
		filter: blur(100px);
	}

	.hero-bg-logo {
		position: absolute;
		bottom: -200px;
		right: -200px;
		width: 850px;
		height: auto;
		opacity: 0.18;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}

	.hero-bg-logo :global(svg) {
		width: 100%;
		height: auto;
		display: block;
	}

	.hero-bg-logo :global(svg path) {
		stroke-width: 1.8px;
		stroke-opacity: 1 !important;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
		max-width: var(--content-max);
		margin: 0 auto;
	}

	/* Tag pill */
	.hero-tag-pill {
		display: inline-flex;
		align-items: center;
		align-self: flex-start;
		padding: 6px 12px;
		border-radius: var(--radius-full);
		background: var(--color-surface-tag);
		border: 0.2px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(3.4px);
		-webkit-backdrop-filter: blur(3.4px);
		max-width: 100%;
	}

	.hero-tag-pill span {
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 400;
		color: var(--color-white);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		line-height: 16px;
		text-align: center;
		word-break: break-word;
	}

	/* Heading */
	.hero-heading {
		font-family: var(--font-headline);
		font-size: var(--text-hero);
		font-weight: 700;
		color: var(--color-white);
		line-height: 0.9;
		letter-spacing: -0.02em;
		margin: 0;
		word-wrap: break-word;
	}

	.accent-green {
		color: var(--color-accent-primary);
	}

	/* Subtitle */
	.hero-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin: 0;
		max-width: 100%;
	}

	/* CTA group */
	.hero-cta-group {
		display: flex;
		gap: 16px;
		align-items: center;
		width: 100%;
	}

	.btn-primary {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 16px 24px;
		border-radius: var(--radius-full);
		background: var(--color-primary);
		border: 1px solid var(--color-primary);
		color: var(--color-on-primary);
		font-family: var(--font-body);
		font-size: 16px;
		font-weight: 600;
		text-decoration: none;
		box-shadow: 0 0 8px var(--color-primary-glow);
		transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s var(--ease-out-expo);
		transform: translateY(0) translateZ(0);
		will-change: transform;
		backface-visibility: hidden;
		transform-style: preserve-3d;
	}

	.btn-primary > :global(*) {
		will-change: transform;
		backface-visibility: hidden;
		transform: translate3d(0, 0, 0);
	}

	.btn-primary:hover {
		transform: translateY(-2px) translateZ(0);
		box-shadow: 0 0 16px var(--color-primary-glow);
	}

	.btn-outline {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px 24px;
		min-height: 44px;
		border-radius: var(--radius-full);
		background: var(--color-surface-base);
		border: 1px solid var(--color-border-outline);
		color: var(--color-white);
		font-family: var(--font-body);
		font-size: 16px;
		font-weight: 600;
		text-decoration: none;
		text-align: center;
		transition: transform var(--dur-normal) var(--ease-out-expo), border-color var(--dur-fast) var(--ease-out-expo);
		transform: translateY(0) translateZ(0);
		will-change: transform;
		backface-visibility: hidden;
		transform-style: preserve-3d;
	}

	.btn-outline > :global(*) {
		will-change: transform;
		backface-visibility: hidden;
		transform: translate3d(0, 0, 0);
	}

	.btn-outline:hover {
		transform: translateY(-2px) translateZ(0);
		border-color: var(--color-white);
	}

	/* Benefit tags */
	.hero-tags {
		display: flex;
		gap: 32px;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 56px;
	}

	.hero-tag-item {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.tag-badge {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--color-card-green-1);
		color: var(--color-surface-base);
		display: grid;
		place-items: center;
		flex-shrink: 0;
		line-height: 0;
		font-size: 0;
	}

	.tag-badge :global(svg) {
		display: block;
		flex-shrink: 0;
		margin: 0;
	}

	.tag-label {
		font-family: var(--font-body);
		font-size: 20px;
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 24px;
		white-space: nowrap;
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.hero-section {
			padding: calc(var(--section-pad-md) + 48px) var(--gutter) var(--section-pad-sm);
		}

		.hero-heading {
			font-size: var(--text-hero);
			line-height: 1.05;
			letter-spacing: -0.02em;
		}

		.hero-subtitle {
			font-size: var(--text-base);
			line-height: 1.6;
		}

		.hero-subtitle br {
			display: none;
		}

		.hero-cta-group {
			flex-direction: column;
			align-items: stretch;
		}

		.btn-primary, .btn-outline {
			width: 100%;
		}

		.hero-tags {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
			margin-top: 36px;
		}

		.tag-label {
			font-size: 16px;
			white-space: normal;
		}

		.hero-bg-gradient {
			width: 480px;
			height: 480px;
			right: -110px;
			bottom: -110px;
			background: radial-gradient(circle at center, rgba(215, 144, 240, 0.24) 0%, rgba(135, 78, 203, 0.1) 50%, transparent 75%);
			top: auto;
			transform: none;
		}

		.hero-bg-logo {
			width: 480px;
			right: -110px;
			bottom: -110px;
			top: auto;
			transform: none;
			opacity: 0.06;
		}
	}
</style>
