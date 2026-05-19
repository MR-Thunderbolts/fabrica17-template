<script lang="ts">
	import shape1 from "./assets/shape-1.svg?raw"; // wavy square (screenshot 1)
	import shape16 from "./assets/shape-16.svg?raw"; // flor/cross 4 pétalos
	import shape12 from "./assets/shape-12.svg?raw"; // escudo/pentagon
	import shape3  from "./assets/shape-3.svg?raw";  // arco
	import shape21 from "./assets/shape-21.svg?raw"; // arch (screenshot 5)
	import shape22 from "./assets/shape-22.svg?raw"; // quatrefoil (screenshot 6)

	// Recolor each SVG: replace hardcoded fill with solid pastel background
	function recolor(raw: string, bg: string): string {
		return raw
			.replace(/fill="#[^"]+"/g, `fill="none"`)
			.replace(/<path /g, `<path fill="${bg}" `);
	}

	const steps = [
		{ number: "1", label: "Taller Inicial",                 bg: "#effbca", svg: shape1 },
		{ number: "2", label: "Planificación &\nInvestigación", bg: "#ccd3df", svg: shape16 },
		{ number: "3", label: "Contenido",                      bg: "#f7e9fc", svg: shape12 },
		{ number: "4", label: "Diseño Web",                     bg: "#fdf1d3", svg: shape3  },
		{ number: "5", label: "Desarrollo &\nTesting",          bg: "#fbd8d1", svg: shape21 },
		{ number: "6", label: "Entrega &\nPostventa",           bg: "#effbca", svg: shape22 }
	];
</script>

<section class="plan-section">
	<div class="plan-bg-glow"></div>

	<div class="plan-container">
		<div class="plan-heading">
			<div class="badge-pill">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
				<span>PLAN DE TRABAJO</span>
			</div>
			<h2 class="plan-title">6 pasos para transformar tu sitio web</h2>
			<p class="plan-subtitle">Nuestro proceso está diseñado para entregar resultados medibles en el menor tiempo posible.</p>
		</div>

		<div class="plan-timeline">
			{#each steps as step, i}
				<div class="timeline-step">
					<div class="step-blob" style="--shape-bg: {step.bg}">
						<span class="shape-bg">{@html recolor(step.svg, step.bg)}</span>
						<span class="blob-number">{step.number}</span>
					</div>
					<p class="step-label">{step.label}</p>
				</div>
			{/each}
		</div>

		<div class="plan-cta">
			<a href="#cotizar" class="btn-plan">
				<span class="btn-plan-text">
					<span class="btn-plan-main">Tu sitio listo en 7 días</span>
					<span class="btn-plan-sub">*El plazo varía según el proyecto.</span>
				</span>
			</a>
		</div>
	</div>
</section>

<style>
	.plan-section {
		position: relative;
		padding: var(--section-pad-md) var(--gutter);
		background: var(--color-audit-surface);
		overflow: hidden;
		width: 100%;
	}

	.plan-bg-glow {
		position: absolute;
		top: -200px;
		left: 50%;
		transform: translateX(-50%);
		width: 1200px;
		height: 800px;
		background: radial-gradient(ellipse at center, rgba(215, 144, 240, 0.06) 0%, transparent 70%);
		pointer-events: none;
		z-index: 0;
	}

	.plan-container {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 64px;
		max-width: 1128px;
		margin: 0 auto;
	}

	.plan-heading {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		text-align: center;
	}

	.badge-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 13px;
		border-radius: var(--radius-lg);
		background: var(--color-surface-tag);
		border: 1px solid var(--color-border-card);
	}

	.badge-pill svg {
		color: var(--color-primary);
	}

	.badge-pill span {
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 400;
		color: var(--color-primary);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.plan-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		margin: 0;
	}

	.plan-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-lg);
		font-weight: 400;
		color: var(--color-audit-fg);
		line-height: 1.5;
		margin: 0;
		max-width: 600px;
	}

	/* Timeline */
	.plan-timeline {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: clamp(16px, 3vw, 40px);
		width: 100%;
	}

	.timeline-step {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		flex: 1;
		min-width: 100px;
		max-width: 156px;
	}

	.step-blob {
		position: relative;
		width: 92px;
		height: 92px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s var(--ease-out-expo);
	}

	.step-blob:hover {
		transform: scale(1.1);
	}

	.step-blob:hover .shape-bg :global(svg) {
		filter: drop-shadow(0 0 16px color-mix(in srgb, var(--shape-bg) 75%, transparent));
	}

	.shape-bg {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shape-bg :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
		overflow: visible;
		transition: filter 0.3s var(--ease-out-expo);
		will-change: filter;
	}

	.blob-number {
		position: relative;
		z-index: 1;
		font-family: var(--font-headline);
		font-size: 36px;
		font-weight: 700;
		color: var(--color-audit-surface);
		line-height: 1;
	}

	.step-label {
		font-family: var(--font-headline);
		font-size: 16px;
		font-weight: 600;
		color: var(--color-white);
		line-height: 1.3;
		text-align: center;
		margin: 0;
		white-space: pre-line;
		min-height: 42px;
	}

	/* CTA */
	.plan-cta {
		display: flex;
		justify-content: center;
	}

	.btn-plan {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 12px 24px;
		border-radius: var(--radius-full);
		background: rgba(215, 144, 240, 0.06);
		border: 1px solid var(--color-primary);
		box-shadow: 0 0 12px rgba(215, 144, 240, 0.12), inset 0 0 12px rgba(215, 144, 240, 0.04);
		text-decoration: none;
		transition: transform var(--dur-fast) var(--ease-out-expo), box-shadow var(--dur-fast) var(--ease-out-expo), background var(--dur-fast) var(--ease-out-expo);
	}

	.btn-plan:hover {
		transform: translateY(-2px);
		background: rgba(215, 144, 240, 0.1);
		box-shadow: 0 0 24px rgba(215, 144, 240, 0.3), inset 0 0 12px rgba(215, 144, 240, 0.06);
	}

	.btn-plan-text {
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 1px;
	}

	.btn-plan-main {
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: 600;
		color: var(--color-primary);
		line-height: 22px;
		white-space: nowrap;
		letter-spacing: 0.01em;
	}

	.btn-plan-sub {
		font-family: var(--font-body);
		font-size: 11px;
		font-weight: 400;
		color: var(--color-primary);
		line-height: 18px;
		white-space: nowrap;
		opacity: 0.55;
		letter-spacing: 0.01em;
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.plan-section {
			padding: var(--section-pad-sm) var(--gutter);
		}

		.plan-title {
			font-size: var(--text-2xl);
			line-height: 1.15;
		}

		.plan-subtitle {
			font-size: 16px;
		}

		.plan-timeline {
			flex-wrap: wrap;
			gap: 16px;
			justify-content: center;
		}

		.timeline-step {
			width: calc(33.33% - 16px);
			min-width: 90px;
			max-width: none;
		}

		.step-blob {
			width: 72px;
			height: 72px;
		}

		.blob-number {
			font-size: 26px;
		}

		.step-label {
			font-size: 12px;
			line-height: 16px;
		}
	}
</style>
