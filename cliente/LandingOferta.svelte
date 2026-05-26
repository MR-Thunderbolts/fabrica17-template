<script lang="ts">
	import IconShootingStar from "~icons/mynaui/star";
	import IconClock from "~icons/mynaui/clock-circle";
	import IconRocket from "~icons/mynaui/rocket";
	import IconCode from "~icons/mynaui/code";
	import BadgePill from "./BadgePill.svelte";
	import { reveal } from "./reveal";
</script>

<section class="oferta-section" use:reveal>
	<div class="oferta-bg-glow"></div>

	<div class="oferta-heading">
		<BadgePill>
			{#snippet icon()}<IconShootingStar />{/snippet}
			NUESTROS SERVICIOS
		</BadgePill>
		<h2 class="oferta-title">Elige el servicio que necesitas</h2>
		<p class="oferta-subtitle">Soluciones digitales diseñadas para potenciar tu negocio online.</p>
	</div>

	<div class="oferta-cards">
		<!-- Card 1: Optimización Web -->
		<div class="service-card">
			<div class="card-content">
				<div class="card-header">
					<div class="icon-container">
						<IconClock width="32" height="32" />
					</div>
					<h3 class="card-title">Optimización Web</h3>
					<div class="card-price-container">
						<span class="price-val">$150.000</span>
						<span class="price-currency">CLP</span>
					</div>
				</div>
				<p class="card-subtitle">Mejoramos tu velocidad y conversión</p>
				<ul class="card-bullets">
					<li>Auditoría completa de <span>velocidad</span></li>
					<li>Optimización de <span>conversión y SEO</span></li>
					<li>Aumento de velocidad a <span>A+</span></li>
				</ul>
			</div>
			<a href="#auditoria" class="btn-card secondary">
				Comenzar auditoría
			</a>
		</div>

		<!-- Card 2: Landing Page (Popular) -->
		<div class="service-card featured">
			<div class="card-badge">★ POPULAR</div>
			<div class="card-content">
				<div class="card-header">
					<div class="icon-container featured-icon">
						<IconRocket width="32" height="32" />
					</div>
					<h3 class="card-title">Landing Page</h3>
					<div class="card-price-container">
						<span class="price-val">$300.000</span>
						<span class="price-currency">CLP</span>
					</div>
				</div>
				<p class="card-subtitle text-highlight">Tu sitio de alto impacto en 7 días</p>
				<ul class="card-bullets">
					<li>Diseño <span>responsivo premium</span></li>
					<li>Estructura <span>ultra-rápida</span> y SEO</li>
					<li>Optimizado para <span>campañas de pago</span></li>
					<li>Entrega garantizada en <span>7 días</span></li>
				</ul>
			</div>
			<a href="#cotizar" data-plan="landing" class="btn-card accent">
				Solicitar Landing
			</a>
		</div>

		<!-- Card 3: Sitio Web desde 0 (Custom, Highest ticket) -->
		<div class="service-card premium-custom">
			<div class="card-content">
				<div class="card-header">
					<div class="icon-container custom-icon">
						<IconCode width="32" height="32" />
					</div>
					<h3 class="card-title">Sitio Web desde 0</h3>
					<div class="card-price-container custom-price">
						<span class="price-text">Cotización personalizada</span>
					</div>
				</div>
				<p class="card-subtitle">Desarrollo a medida de alto impacto</p>
				<ul class="card-bullets">
					<li>Arquitectura y diseño <span>100% custom</span></li>
					<li>Panel autoadministrable (<span>CMS</span>)</li>
					<li>Estructura <span>escalable y segura</span></li>
					<li>Soporte y <span>mantenimiento continuo</span></li>
				</ul>
			</div>
			<!-- Pink color is reserved for our most important/profitable CTA -->
			<a href="#cotizar" data-plan="sitio" class="btn-card primary">
				Solicitar cotización
			</a>
		</div>
	</div>
</section>

<style>
	.oferta-section {
		position: relative;
		z-index: 5;
		padding: var(--section-pad-lg) var(--gutter);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 56px;
		background: var(--color-surface-base);
		overflow: hidden;
		width: 100%;
	}

	.oferta-bg-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 1200px;
		height: 800px;
		background: var(--glow-purple);
		pointer-events: none;
		z-index: 0;
		opacity: 0.8;
	}

	.oferta-heading {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		text-align: center;
		max-width: 980px;
	}

	.oferta-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		letter-spacing: -0.01em;
		margin: 0;
	}

	.oferta-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin: 0;
		max-width: 600px;
	}

	.oferta-cards {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 28px;
		width: 100%;
		max-width: var(--content-max);
		align-items: stretch;
	}

	.service-card {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40px 32px;
		border-radius: var(--radius-xl);
		background: rgba(20, 24, 39, 0.6);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		gap: 36px;
		transition: transform 0.4s var(--ease-out-expo), border-color 0.4s var(--ease-out-expo), box-shadow 0.4s var(--ease-out-expo);
	}

	.service-card:hover {
		transform: translateY(-4px);
		border-color: rgba(255, 255, 255, 0.16);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
	}

	/* Featured Card Styling (Landing Page) */
	.service-card.featured {
		background: rgba(25, 30, 49, 0.85);
		border: 2px solid var(--color-accent-primary);
		box-shadow: 0 8px 24px rgba(214, 244, 122, 0.06);
		transform: scale(1.03);
	}

	.service-card.featured:hover {
		transform: translateY(-4px) scale(1.03);
		border-color: var(--color-accent-primary);
		box-shadow: 0 16px 36px rgba(214, 244, 122, 0.12);
	}

	/* Premium Card Styling (Sitio desde 0) */
	.service-card.premium-custom {
		border-color: rgba(215, 144, 240, 0.2);
	}
	
	.service-card.premium-custom:hover {
		border-color: var(--color-primary);
		box-shadow: 0 16px 36px rgba(215, 144, 240, 0.08);
	}

	.card-badge {
		position: absolute;
		top: -14px;
		right: 32px;
		background: var(--color-accent-primary);
		color: var(--color-bg-base);
		font-family: var(--font-headline);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 5px 12px;
		border-radius: var(--radius-full);
		box-shadow: 0 4px 10px rgba(214, 244, 122, 0.2);
		z-index: 10;
	}

	.card-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
		flex-grow: 1;
	}

	.card-header {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.icon-container {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.04);
		color: var(--color-text-secondary);
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.icon-container.featured-icon {
		background: rgba(214, 244, 122, 0.08);
		color: var(--color-accent-primary);
		border: 1px solid rgba(214, 244, 122, 0.15);
	}

	.icon-container.custom-icon {
		background: rgba(215, 144, 240, 0.08);
		color: var(--color-primary);
		border: 1px solid rgba(215, 144, 240, 0.15);
	}

	.card-title {
		font-family: var(--font-headline);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.2;
		margin: 0;
	}

	.card-price-container {
		display: flex;
		align-items: baseline;
		gap: 4px;
		margin-top: -4px;
	}

	.price-val {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-white);
		letter-spacing: -0.02em;
	}

	.price-currency {
		font-family: var(--font-headline);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text-muted);
	}

	.card-price-container.custom-price {
		margin-top: 2px;
	}

	.price-text {
		font-family: var(--font-headline);
		font-size: 1.35rem;
		font-weight: 700;
		color: var(--color-primary);
		letter-spacing: -0.01em;
	}

	.card-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 400;
		color: var(--color-text-muted);
		line-height: 1.5;
		margin: 0;
	}

	.card-subtitle.text-highlight {
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	.card-bullets {
		list-style: none;
		margin: 0;
		padding: 0;
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 400;
		color: var(--color-text-secondary);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.card-bullets li {
		position: relative;
		padding-left: 20px;
		line-height: 1.5;
	}

	.card-bullets li::before {
		content: "•";
		position: absolute;
		left: 4px;
		color: rgba(255, 255, 255, 0.35);
		font-size: 1.1rem;
		line-height: 1;
	}

	.service-card.featured .card-bullets li::before {
		color: var(--color-accent-primary);
	}

	.service-card.premium-custom .card-bullets li::before {
		color: var(--color-primary);
	}

	.card-bullets span {
		color: var(--color-white);
		font-weight: 600;
	}

	.btn-card {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 12px 24px;
		border-radius: var(--radius-full);
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 600;
		text-decoration: none;
		transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s var(--ease-out-expo), background-color 0.3s var(--ease-out-expo);
		width: 100%;
		text-align: center;
	}

	.btn-card:hover {
		transform: translateY(-2px);
	}

	/* Card 1 Button: Secondary */
	.btn-card.secondary {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.12);
		color: var(--color-white);
	}

	.btn-card.secondary:hover {
		background: rgba(255, 255, 255, 0.09);
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 4px 12px rgba(255, 255, 255, 0.03);
	}

	/* Card 2 Button: Popular Accent */
	.btn-card.accent {
		background: var(--color-accent-primary);
		color: var(--color-bg-base);
		border: none;
	}

	.btn-card.accent:hover {
		box-shadow: 0 4px 20px rgba(214, 244, 122, 0.3);
	}

	/* Card 3 Button: Premium Pink (Our most important CTA) */
	.btn-card.primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
		border: none;
		box-shadow: 0 4px 12px var(--color-primary-glow);
	}

	.btn-card.primary:hover {
		box-shadow: 0 6px 20px rgba(215, 144, 240, 0.4);
	}

	/* ── Tablet ── */
	@media (max-width: 1024px) {
		.oferta-cards {
			grid-template-columns: 1fr;
			gap: 32px;
			max-width: 480px;
		}

		.service-card.featured {
			transform: none;
		}

		.service-card.featured:hover {
			transform: translateY(-4px);
		}
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.oferta-section {
			padding: var(--section-pad-sm) var(--gutter);
			gap: 40px;
		}

		.oferta-title {
			font-size: var(--text-2xl);
		}

		.service-card {
			padding: 32px 24px;
			gap: 28px;
		}

		.card-badge {
			right: 24px;
		}
	}
</style>
