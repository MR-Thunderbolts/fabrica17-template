<script lang="ts">
	import IconShieldCheck from "~icons/mynaui/shield-check";
	import IconLock from "~icons/mynaui/lock";
	import IconCpu from "~icons/mynaui/microchip";
	import IconFloppyDisk from "~icons/mynaui/save";
	import IconLeaf from "~icons/mynaui/leaf";
	import BadgePill from "./BadgePill.svelte";
	import { reveal } from "./reveal";
</script>

<section class="seguridad-section" use:reveal>
	<div class="seg-container">
		<div class="seg-heading">
			<BadgePill color="var(--color-accent-primary)">
				{#snippet icon()}<IconShieldCheck />{/snippet}
				SEGURIDAD
			</BadgePill>
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
		position: relative;
		padding: var(--section-pad-lg) var(--gutter);
		background: var(--color-bg-deep);
		display: flex;
		justify-content: center;
		width: 100%;
		overflow: hidden;
	}

	.seguridad-section::before {
		content: "";
		position: absolute;
		bottom: -200px;
		left: 50%;
		transform: translateX(-50%);
		width: 1000px;
		height: 500px;
		background: radial-gradient(ellipse at 50% 100%, rgba(214, 244, 122, 0.08) 0%, rgba(100, 140, 255, 0.05) 50%, transparent 75%);
		pointer-events: none;
		z-index: 0;
		filter: blur(40px);
	}

	.seg-container {
		position: relative;
		z-index: 1;
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
		transform: translateY(0) translateZ(0);
		will-change: transform;
		backface-visibility: hidden;
		transform-style: preserve-3d;
	}

	.seg-card > :global(*) {
		will-change: transform;
		backface-visibility: hidden;
		transform: translate3d(0, 0, 0);
	}

	.seg-card:hover {
		transform: translateY(-4px) translateZ(0);
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
		background: var(--color-card-purple);
		color: var(--color-bg-base);
	}
	.seg-card.purple:hover {
		box-shadow: 0 12px 32px rgba(215, 144, 240, 0.04);
	}

	/* Yellow themes */
	.seg-card.yellow .seg-card-icon {
		background: var(--color-card-warning);
		color: var(--color-bg-base);
	}
	.seg-card.yellow:hover {
		box-shadow: 0 12px 32px rgba(253, 241, 211, 0.04);
	}

	/* Green themes */
	.seg-card.green .seg-card-icon {
		background: var(--color-card-green-2);
		color: var(--color-bg-base);
	}
	.seg-card.green:hover {
		box-shadow: 0 12px 32px rgba(214, 244, 122, 0.04);
	}

	/* Blue/Silver themes */
	.seg-card.blue .seg-card-icon {
		background: var(--color-card-blue-2);
		color: var(--color-bg-base);
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
