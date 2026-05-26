<script lang="ts">
	import logoCiclo from "./assets/Logo-Ciclo17.svg?raw";
	import certSeal from "./assets/Certification_Seal.svg?raw";
	import { reveal } from "./reveal";
</script>

<footer class="footer-section" use:reveal>
	<!-- CTA Card -->
	<div class="cta-wrapper">
		<div class="cta-card">
			<div class="cta-content">
				<span class="cta-badge">AUDITORÍA GRATUITA</span>
				<h2 class="cta-title">Audita online tu sitio<br>y comienza a convertir</h2>
				<p class="cta-subtitle">Nuestra calculadora digital enfocada en el performance de tu sitio,<br>te entregará datos de velocidad, experiencia de usuari@ y sustentabilidad digital</p>
				<a href="#auditoria" class="btn-cta">
					Auditoría gratuita
				</a>
			</div>
			<div class="cta-bg-glow"></div>
		</div>
	</div>

	<!-- Certifications -->
	<div class="cert-section">
		<h3 class="cert-heading">Consigue nuestras certificaciones</h3>
		<p class="cert-subheading">Tu sitio puede contar con ellas.</p>

		<div class="cert-cards">
			<!-- CO2 Certification Seal -->
			<div class="cert-seal">{@html certSeal}</div>

			<!-- Green Hosting Badge -->
			<div class="cert-row">
				<img src="/footnote-image.png" alt="Green Hosting — ciclo17.cl hosted by Infomaniak — Green Web Foundation" class="green-badge-img" />
				<p class="green-text">Este sitio funciona con energía<br>100% renovable certificada.</p>
			</div>
		</div>
	</div>

	<!-- Brand Footer -->
	<div class="footer-brand">
		<a href="/" class="footer-logo" aria-label="Ir a la página principal">{@html logoCiclo}</a>
		<p class="footer-footnote">
			<a href="/">Ciclo17</a> diseñó y desarrolló este sitio para minimizar su impacto ambiental.
		</p>
	</div>
</footer>

<style>
	.footer-section {
		background: var(--color-surface-dark);
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	/* ── CTA Card ── */
	.cta-wrapper {
		padding: var(--section-pad-lg) var(--gutter) 0;
		display: flex;
		justify-content: center;
	}

	.cta-card {
		position: relative;
		width: 100%;
		max-width: 1128px;
		background: var(--color-surface-base);
		border-radius: 28px;
		padding: 64px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.cta-bg-glow {
		position: absolute;
		bottom: -120px;
		left: 50%;
		transform: translateX(-50%);
		width: 600px;
		height: 400px;
		background: radial-gradient(ellipse at center, rgba(215, 144, 240, 0.25) 0%, transparent 70%);
		pointer-events: none;
		filter: blur(60px);
	}

	.cta-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		max-width: 600px;
	}

	.cta-badge {
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-accent-primary);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.cta-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		letter-spacing: -0.01em;
		margin: 0;
	}

	.cta-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin: 0;
	}

	.btn-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 16px 40px;
		border-radius: var(--radius-full);
		background: var(--color-primary);
		color: var(--color-on-primary);
		font-family: var(--font-body);
		font-size: 16px;
		font-weight: 700;
		text-decoration: none;
		box-shadow: 0 0 24px var(--color-primary-glow), 0 4px 16px rgba(0, 0, 0, 0.3);
		transition: transform var(--dur-fast) var(--ease-out-expo), box-shadow var(--dur-fast) var(--ease-out-expo);
		margin-top: 8px;
	}

	.btn-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 40px var(--color-primary-glow), 0 8px 24px rgba(0, 0, 0, 0.4);
	}

	/* ── Certifications ── */
	.cert-section {
		padding: var(--section-pad-md) var(--gutter) 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
	}

	.cert-heading {
		font-family: var(--font-headline);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-white);
		margin: 0;
	}

	.cert-subheading {
		font-family: var(--font-body);
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		margin: 0 0 16px 0;
	}

	.cert-cards {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 64px;
	}

	/* CO2 Certification Seal (inline SVG) */
	.cert-seal {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cert-seal :global(svg) {
		width: auto;
		height: 80px;
	}

	/* Green Hosting row */
	.cert-row {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.green-badge-img {
		height: 80px;
		width: auto;
		border-radius: 8px;
	}

	.green-text {
		font-family: var(--font-body);
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin: 0;
		text-align: left;
	}

	/* ── Brand Footer ── */
	.footer-brand {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: var(--space-16) var(--gutter) 48px;
		text-align: center;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity var(--dur-fast) var(--ease-out-expo);
	}

	.footer-logo:hover {
		opacity: 0.75;
	}

	.footer-logo :global(svg) {
		height: 32px;
		width: auto;
	}

	.footer-footnote {
		font-family: var(--font-body);
		font-size: 14px;
		color: var(--color-text-secondary);
		opacity: 0.7;
		line-height: 20px;
		margin: 0;
	}

	.footer-footnote a {
		color: var(--color-text-secondary);
		text-decoration: underline;
		transition: color var(--dur-fast);
	}

	.footer-footnote a:hover {
		color: var(--color-white);
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.cta-wrapper {
			padding: var(--section-pad-sm) var(--gutter) 0;
		}

		.cta-card {
			padding: 40px 24px;
		}

		.cta-title {
			font-size: 28px;
			line-height: 1.2;
		}

		.cta-subtitle {
			font-size: 14px;
		}

		.cta-subtitle br {
			display: none;
		}

		.cert-section {
			padding: var(--section-pad-sm) var(--gutter) 0;
		}

		.cert-cards {
			flex-direction: column;
			gap: 32px;
		}

		.cert-row {
			flex-direction: column;
			gap: 16px;
		}

		.green-text {
			text-align: center;
		}

		.footer-brand {
			padding: 32px var(--gutter) 32px;
		}
	}
</style>
