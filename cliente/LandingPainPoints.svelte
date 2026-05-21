<script lang="ts">
	import { reveal } from "./reveal";
	import IconRefresh from "~icons/ph/arrows-clockwise";
	import IconDollar from "~icons/ph/currency-dollar";
	import IconHeartBroken from "~icons/ph/heart-break";
</script>

<section class="painpoints-section" use:reveal>
	<div class="container">
		<div class="painpoints-heading">
			<h2 class="painpoints-title">¿Te suena familiar?</h2>
			<p class="painpoints-subtitle">Desafíos comunes en nuestros clientes.</p>
		</div>

		<div class="painpoints-grid">
			<!-- Card 1 -->
			<div class="pain-card" style="background: var(--color-card-green-1);">
				<div class="pain-icon">
					<IconRefresh width="36" height="36" />
				</div>
				<div class="pain-content">
					<div class="pain-number">01.</div>
					<p class="pain-card-title">Tu sitio web no está generando los resultados esperados</p>
				</div>
				<div class="pain-footer">
					<span class="pain-consigue">CONSIGUE</span>
					<span class="pain-stat">2.4X más conversión</span>
				</div>
			</div>

			<!-- Card 2 -->
			<div class="pain-card" style="background: var(--color-card-warning);">
				<div class="pain-icon">
					<IconDollar width="32" height="32" />
				</div>
				<div class="pain-content">
					<div class="pain-number">02.</div>
					<p class="pain-card-title">Tu inversión en publicidad no está generando retorno</p>
				</div>
				<div class="pain-footer">
					<span class="pain-consigue">CONSIGUE</span>
					<span class="pain-stat">Optimizar ROI</span>
				</div>
			</div>

			<!-- Card 3 -->
			<div class="pain-card" style="background: var(--color-card-purple);">
				<div class="pain-icon">
					<IconHeartBroken width="32" height="32" />
				</div>
				<div class="pain-content">
					<div class="pain-number">03.</div>
					<p class="pain-card-title">Tu sitio está lento, pierdes clientes sin darte cuenta</p>
				</div>
				<div class="pain-footer">
					<span class="pain-consigue">CONSIGUE</span>
					<span class="pain-stat">3X más velocidad</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.painpoints-section {
		position: relative;
		z-index: 10;
		padding: var(--section-pad-sm) var(--gutter);
		width: 100%;
		background: transparent;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 40px;
		width: 100%;
		max-width: var(--content-max);
		margin: 0 auto;
	}

	.painpoints-heading {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.painpoints-title {
		font-family: var(--font-headline);
		font-size: var(--text-3xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		margin: 0;
	}

	.painpoints-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin: 0;
		text-align: right;
	}

	/* ── Layout ── */
	.painpoints-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	/* ── Cards ── */
	.pain-card {
		border-radius: var(--radius-lg);
		padding: 40px;
		display: flex;
		flex-direction: column;
		min-height: 400px;
		transition: transform 0.4s var(--ease-out-expo);
		color: #191e31;
	}

	.pain-card:hover {
		transform: translateY(-4px);
	}

	.pain-icon {
		margin-bottom: auto;
		color: #191e31;
	}

	.pain-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 32px;
	}

	.pain-number {
		font-family: var(--font-headline);
		font-size: var(--text-base);
		font-weight: 700;
	}

	.pain-card-title {
		font-family: var(--font-headline);
		font-size: var(--text-xl);
		font-weight: 700;
		line-height: 1.2;
		margin: 0;
	}

	.pain-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20px;
		border-top: 1px solid rgba(25, 30, 49, 0.2);
	}

	.pain-consigue {
		font-family: var(--font-headline);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		opacity: 0.6;
	}

	.pain-stat {
		font-family: var(--font-headline);
		font-size: 14px;
		font-weight: 700;
	}

	/* ── Mobile ── */
	@media (max-width: 960px) {
		.painpoints-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.painpoints-section {
			padding: var(--section-pad-md) var(--gutter);
		}

		.painpoints-heading {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
		}

		.painpoints-title {
			font-size: var(--text-2xl);
		}

		.painpoints-subtitle {
			text-align: left;
			font-size: var(--text-base);
		}

		.painpoints-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.pain-card {
			padding: 28px 24px;
			min-height: unset;
		}

		.pain-icon {
			margin-bottom: 24px;
		}

		.pain-number {
			font-size: var(--text-lg);
		}

		.pain-card-title {
			font-size: var(--text-xl);
			line-height: 1.25;
		}

		.pain-content {
			gap: 10px;
			margin-bottom: 24px;
		}

		.pain-stat {
			font-size: 16px;
		}

		.pain-consigue {
			font-size: 12px;
		}
	}
</style>
