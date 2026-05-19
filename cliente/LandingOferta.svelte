<script lang="ts">
	import IconShootingStar from "~icons/ph/shooting-star";
	import IconClock from "~icons/ph/clock";
	import IconRocket from "~icons/ph/rocket-launch";
	import { reveal } from "./reveal";
</script>

<section class="oferta-section" use:reveal>
	<div class="oferta-bg-glow"></div>

	<div class="oferta-heading">
		<div class="badge-pill">
			<IconShootingStar width="16" height="16" />
			<span>LO QUE TE OFRECEMOS</span>
		</div>
		<h2 class="oferta-title">Haz que el tráfico de tu sitio convierta</h2>
		<p class="oferta-subtitle">Dos formas de mejorar tu web.</p>
	</div>

	<div class="oferta-cards">
		<!-- Card 1 -->
		<div class="service-card">
			<div class="card-content">
				<div class="card-header">
					<div class="icon-container">
						<IconClock width="32" height="32" />
					</div>
					<h3 class="card-title">Optimización Web</h3>
				</div>
				<p class="card-subtitle">Mejoramos tu sitio actual</p>
				<ul class="card-bullets">
					<li>Auditoría completa</li>
					<li>Optimizamos <span>conversión</span></li>
					<li>Aumentamos tu velocidad</li>
				</ul>
			</div>
			<a href="/reporte" class="btn-card primary">
				Auditoría gratuita
			</a>
		</div>

		<!-- Card 2 -->
		<div class="service-card">
			<div class="card-badge">Tu sitio listo en 7 días</div>
			<div class="card-content">
				<div class="card-header">
					<div class="icon-container">
						<IconRocket width="32" height="32" />
					</div>
					<h3 class="card-title">Sitio Web desde 0</h3>
				</div>
				<p class="card-subtitle">Construimos tu sitio desde 0</p>
				<ul class="card-bullets">
					<li>Mejora desde el primer día</li>
					<li>Arquitectura optimizada</li>
					<li>Desarrollo eficiente y seguro</li>
				</ul>
			</div>
			<a href="#cotizar" class="btn-card accent">
				Cotizar un sitio web
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
		background: transparent;
	}

	.oferta-bg-glow {
		position: absolute;
		top: -400px;
		left: 50%;
		transform: translateX(-50%);
		width: 1440px;
		height: 1200px;
		background: radial-gradient(ellipse at 50% 50%, rgba(47, 33, 91, 0.4) 0%, transparent 60%);
		pointer-events: none;
		z-index: 0;
	}

	.oferta-heading {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		text-align: center;
		max-width: 980px;
	}

	.badge-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 13px;
		border-radius: var(--radius-lg);
		background: var(--color-surface-tag);
		border: 1px solid var(--color-border-card);
		backdrop-filter: blur(2.675px);
		-webkit-backdrop-filter: blur(2.675px);
	}

	.badge-pill :global(svg) {
		color: var(--color-primary);
	}

	.badge-pill span {
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 400;
		color: var(--color-primary);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		line-height: 16px;
	}

	.oferta-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		margin: 0;
	}

	.oferta-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 400;
		color: var(--color-audit-fg);
		line-height: 1.5;
		margin: 0;
	}

	.oferta-cards {
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: center;
		gap: 24px;
		width: 100%;
	}

	.service-card {
		position: relative;
		flex: 1 1 280px;
		max-width: 360px;
		min-height: 350px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 36px 32px;
		border-radius: var(--radius-md);
		background: var(--color-audit-surface);
		border: 1px solid var(--color-border-card);
		gap: 32px;
	}

	.card-badge {
		position: absolute;
		top: 28px;
		right: 28px;
		background: rgba(214, 244, 122, 0.1);
		border: 1px solid rgba(214, 244, 122, 0.25);
		color: var(--color-audit-accent);
		font-family: var(--font-headline);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		padding: 4px 10px;
		border-radius: var(--radius-full);
	}

	.card-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex-grow: 1;
	}

	.card-header {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.icon-container {
		width: 32px;
		height: 32px;
		color: var(--color-audit-accent);
	}

	.card-title {
		font-family: var(--font-body);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 30px;
		margin: 0;
	}

	.card-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-audit-fg);
		line-height: 23px;
		margin: 0;
	}

	.card-bullets {
		list-style: disc;
		margin: 0;
		padding-left: 24px;
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 400;
		color: var(--color-audit-fg);
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.card-bullets li {
		line-height: 23px;
	}

	.card-bullets span {
		color: var(--color-white);
		font-weight: 600;
	}

	.btn-card {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px 16px;
		border-radius: var(--radius-lg);
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 600;
		text-decoration: none;
		color: var(--color-on-primary);
		transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s var(--ease-out-expo);
	}

	.btn-card.primary {
		background: var(--color-primary);
		border: 1px solid var(--color-primary);
		box-shadow: 0 0 8px var(--color-primary-glow);
	}

	.btn-card.primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 16px var(--color-primary-glow);
	}

	.btn-card.accent {
		background: var(--color-card-green-2);
		border: 1px solid var(--color-audit-accent);
	}

	.btn-card.accent:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 16px rgba(214, 244, 122, 0.4);
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.oferta-section {
			padding: var(--section-pad-sm) var(--gutter);
			gap: 32px;
			width: 100%;
		}

		.oferta-heading {
			padding: 0;
		}

		.oferta-title {
			font-size: var(--text-2xl);
			line-height: 1.15;
		}

		.oferta-cards {
			flex-direction: column;
			align-items: center;
			gap: 24px;
		}

		.service-card {
			width: 100%;
			max-width: 100%;
			min-width: 0;
			height: auto;
			min-height: auto;
			padding: 28px 24px;
			gap: 28px;
		}

		.card-badge {
			top: 24px;
			right: 24px;
		}

		.oferta-bg-glow {
			width: 100%;
			left: -50%;
		}
	}
</style>
