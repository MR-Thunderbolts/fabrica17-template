<script lang="ts">
	import IconShieldCheck from "~icons/mynaui/shield-check";
	import IconLock from "~icons/mynaui/lock";
	import IconCpu from "~icons/mynaui/microchip";
	import IconFloppyDisk from "~icons/mynaui/save";
	import IconLeaf from "~icons/mynaui/leaf";
	import { reveal } from "./reveal";
</script>

<section class="seguridad-section" use:reveal>
	<div class="seg-container">
		<div class="seg-heading">
			<div class="badge-pill">
				<IconShieldCheck width="16" height="16" />
				<span>SEGURIDAD</span>
			</div>
			<h2 class="seg-title">Tu sitio web protegido y certificado</h2>
			<p class="seg-subtitle">Implementamos las mejores prácticas de seguridad y rendimiento para que tu sitio funcione sin interrupciones.</p>
		</div>

		<!-- Bento 2x2 Grid -->
		<div class="seg-bento">
			<div class="seg-card purple">
				<div class="seg-card-icon">
					<IconLock width="22" height="22" />
				</div>
				<h3 class="seg-card-title">SSL Seguro</h3>
				<p class="seg-card-desc">Implementamos y configuramos SSL correctamente para proteger datos y generar confianza en tus usuarios.</p>
			</div>

			<div class="seg-card yellow">
				<div class="seg-card-icon">
					<IconCpu width="22" height="22" />
				</div>
				<h3 class="seg-card-title">Core Intacto</h3>
				<p class="seg-card-desc">Tu sitio se mantiene actualizable, estable y compatible a largo plazo.</p>
			</div>

			<div class="seg-card green">
				<div class="seg-card-icon">
					<IconFloppyDisk width="22" height="22" />
				</div>
				<h3 class="seg-card-title">Auto Backups</h3>
				<p class="seg-card-desc">Nunca perderás la información de tu sitio con nuestros backups automáticos.</p>
			</div>

			<div class="seg-card blue">
				<div class="seg-card-icon">
					<IconLeaf width="22" height="22" />
				</div>
				<h3 class="seg-card-title">Servidor Certificados</h3>
				<p class="seg-card-desc">Utilizamos servidores certificados con energía renovable para garantizar el máximo rendimiento y seguridad de tu sitio.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.seguridad-section {
		padding: var(--section-pad-lg) var(--gutter);
		background: var(--color-surface-base);
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.seg-container {
		display: flex;
		flex-direction: column;
		gap: 48px;
		width: 100%;
		max-width: var(--content-max);
		margin: 0 auto;
	}

	.seg-heading {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 600px;
	}

	.badge-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 13px;
		border-radius: var(--radius-lg);
		background: var(--color-surface-tag);
		border: 1px solid var(--color-border-card);
		width: fit-content;
	}

	.badge-pill :global(svg) {
		color: var(--color-accent-primary);
	}

	.badge-pill span {
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 400;
		color: var(--color-accent-primary);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.seg-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		letter-spacing: -0.01em;
		margin: 0;
	}

	.seg-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin: 0;
	}

	/* ── Bento Grid ── */
	.seg-bento {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		width: 100%;
	}

	.seg-card {
		padding: 36px 40px;
		border: 1px solid var(--color-border-card);
		border-radius: var(--radius-xl);
		background: var(--color-surface-base);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
		transition: transform 0.4s var(--ease-out-expo), box-shadow 0.4s var(--ease-out-expo), border-color 0.4s var(--ease-out-expo);
	}

	.seg-card:hover {
		transform: translateY(-4px);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.seg-card-icon {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	/* Purple themes */
	.seg-card.purple .seg-card-icon {
		background: rgba(215, 144, 240, 0.15);
		color: var(--color-primary);
	}
	.seg-card.purple:hover {
		box-shadow: 0 12px 32px rgba(215, 144, 240, 0.04);
	}

	/* Yellow themes */
	.seg-card.yellow .seg-card-icon {
		background: rgba(253, 241, 211, 0.15);
		color: var(--color-card-warning);
	}
	.seg-card.yellow:hover {
		box-shadow: 0 12px 32px rgba(253, 241, 211, 0.04);
	}

	/* Green themes */
	.seg-card.green .seg-card-icon {
		background: rgba(214, 244, 122, 0.15);
		color: var(--color-accent-primary);
	}
	.seg-card.green:hover {
		box-shadow: 0 12px 32px rgba(214, 244, 122, 0.04);
	}

	/* Blue/Silver themes */
	.seg-card.blue .seg-card-icon {
		background: rgba(224, 231, 255, 0.15);
		color: var(--color-card-blue);
	}
	.seg-card.blue:hover {
		box-shadow: 0 12px 32px rgba(224, 231, 255, 0.04);
	}

	.seg-card-title {
		font-family: var(--font-headline);
		font-size: 20px;
		font-weight: 700;
		color: var(--color-white);
		margin: 0;
	}

	.seg-card-desc {
		font-family: var(--font-body);
		font-size: 15px;
		color: var(--color-text-secondary);
		line-height: 1.55;
		margin: 0;
		opacity: 0.9;
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.seguridad-section {
			padding: var(--section-pad-sm) var(--gutter);
		}

		.seg-title {
			font-size: var(--text-2xl);
			line-height: 1.15;
		}

		.seg-subtitle {
			font-size: var(--text-base);
			line-height: 24px;
		}

		.seg-bento {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.seg-card {
			padding: 28px 24px;
			border-radius: 20px;
			gap: 12px;
		}

		.seg-card-title {
			font-size: var(--text-lg);
		}

		.seg-card-desc {
			font-size: 14px;
			line-height: 1.5;
		}
	}
</style>
