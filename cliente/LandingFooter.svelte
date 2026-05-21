<script lang="ts">
	import logoCiclo from "./assets/Logo-Ciclo17.svg?raw";
	import IconArrowRight from "~icons/ph-bold/arrow-right";
	import IconLeaf from "~icons/ph/leaf";
	import { reveal } from "./reveal";
</script>

<footer class="footer-section" use:reveal>
	<!-- CTA Card -->
	<div class="cta-wrapper">
		<div class="cta-card">
			<div class="cta-content">
				<h2 class="cta-title">Audita online tu sitio y comienza a convertir</h2>
				<p class="cta-subtitle">Descubre el impacto real de tu web en menos de 1 minuto. Totalmente gratis.</p>
				<a href="/reporte" class="btn-primary">
					<span>Auditoría gratuita</span>
					<IconArrowRight width="20" height="20" />
				</a>
			</div>
			<div class="cta-bg-glow"></div>
		</div>
	</div>

	<!-- Footer Bottom -->
	<div class="footer-bottom">
		<div class="footer-container">
			<div class="footer-cert">
				<h3 class="cert-title">Consigue nuestras certificaciones</h3>
				<div class="cert-badges">
					<div class="co2-seal">
						<span class="co2-text">0.02g</span>
						<span class="co2-label">CO₂ por visita</span>
					</div>
					<div class="green-energy">
						<IconLeaf width="18" height="18" class="leaf-icon" />
						<span>Sitio impulsado por energía renovable</span>
					</div>
				</div>
			</div>

			<div class="footer-brand">
				<div class="footer-logo">
					{@html logoCiclo}
				</div>
				<p class="footer-disclaimer">
					© 2026 Ciclo17. Todos los derechos reservados.<br>
					Impulsando la sustentabilidad digital.
				</p>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer-section {
		background: var(--color-surface-dark);
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	/* CTA Card */
	.cta-wrapper {
		padding: var(--section-pad-lg) var(--gutter) var(--section-pad-md);
		display: flex;
		justify-content: center;
	}

	.cta-card {
		position: relative;
		width: 100%;
		max-width: 1128px;
		background: var(--color-surface-base);
		border-radius: var(--radius-md);
		padding: 64px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		overflow: hidden;
		border: 1px solid rgba(215, 144, 240, 0.3);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
	}

	.cta-card::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		padding: 2px;
		background: linear-gradient(135deg, rgba(215, 144, 240, 0.8), rgba(214, 244, 122, 0.8));
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
	}

	.cta-bg-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(215, 144, 240, 0.15) 0%, transparent 60%);
		pointer-events: none;
	}

	.cta-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		max-width: 600px;
	}

	.cta-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		margin: 0;
	}

	.cta-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin: 0;
	}

	.btn-primary {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 16px 32px;
		border-radius: var(--radius-full);
		background: var(--color-primary);
		border: 1px solid var(--color-primary);
		color: var(--color-on-primary);
		font-family: var(--font-body);
		font-size: 18px;
		font-weight: 700;
		text-decoration: none;
		box-shadow: 0 0 16px var(--color-primary-glow);
		transition: transform var(--dur-fast) var(--ease-out-expo), box-shadow var(--dur-fast) var(--ease-out-expo);
		margin-top: 16px;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 24px var(--color-primary-glow);
	}

	/* Footer Bottom */
	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		padding: var(--section-pad-sm) var(--gutter);
	}

	.footer-container {
		max-width: 1128px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 40px;
	}

	.footer-cert {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.cert-title {
		font-family: var(--font-headline);
		font-size: 16px;
		font-weight: 600;
		color: var(--color-white);
		margin: 0;
	}

	.cert-badges {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.co2-seal {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 16px;
		border-radius: var(--radius-full);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		width: fit-content;
	}

	.co2-text {
		font-family: var(--font-headline);
		font-size: 20px;
		font-weight: 700;
		color: var(--color-accent-primary);
	}

	.co2-label {
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		color: var(--color-text-secondary);
	}

	.green-energy {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--color-accent-primary);
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
	}

	:global(.leaf-icon) {
		color: var(--color-accent-primary);
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 24px;
		text-align: right;
	}

	.footer-logo :global(svg) {
		height: 28px;
		width: auto;
		opacity: 0.8;
	}

	.footer-disclaimer {
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 400;
		color: var(--color-text-secondary);
		opacity: 0.7;
		line-height: 20px;
		margin: 0;
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.cta-wrapper {
			padding: 60px 20px 40px;
		}

		.cta-card {
			padding: 40px 24px;
		}

		.cta-title {
			font-size: 32px;
			line-height: 40px;
		}

		.cta-subtitle {
			font-size: 16px;
			line-height: 24px;
		}

		.footer-bottom {
			padding: 40px 20px;
		}

		.footer-container {
			flex-direction: column;
			gap: 48px;
		}

		.footer-brand {
			align-items: flex-start;
			text-align: left;
		}
	}
</style>
