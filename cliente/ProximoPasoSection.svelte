<script lang="ts">
</script>

<section class="section-proximopaso">
	<div class="proximo-card">
		<div class="proximo-content">
			<span class="proximo-label">Próximo paso</span>
			<h2 class="proximo-title">
				¿Te gustaría recibir un<br>
				<span class="text-accent">informe completo gratis?</span>
			</h2>
			<p class="proximo-desc">
				En 30 minutos te mostramos las opciones que posees para mejorar la conversión y rendimiento de tu sitio.
			</p>
			
			<div class="brand-watermark">
				<span class="brand-text">Ciclo17</span>
			</div>
		</div>
		
		<div class="proximo-widget">
			<div class="widget-header">
				<span class="widget-title">Widget de Google Calendar</span>
			</div>
			<div class="widget-body">
				<span class="widget-placeholder">Calendario embebido</span>
			</div>
			<button class="btn-agendar">
				Agendar ahora
			</button>
		</div>
	</div>
</section>

<style>
	.section-proximopaso {
		display: flex;
		flex-direction: column;
		padding: 24px 0;
		width: 100%;
		margin-bottom: 24px;
	}

	.proximo-card {
		/* Figma specifies a complex gradient for the fake glass effect on the main card */
		background-image: 
			linear-gradient(163.615deg, rgba(222, 246, 149, 0.15) 0%, rgba(63, 79, 135, 0.05) 50%, rgba(222, 246, 149, 0.15) 100%), 
			linear-gradient(90deg, rgb(20, 24, 39) 0%, rgb(20, 24, 39) 100%);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 28px;
		padding: 33px;
		display: flex;
		gap: 92px;
		align-items: stretch;
		overflow: hidden;
	}

	.proximo-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex: 1;
		min-width: 0;
	}

	.proximo-label {
		color: var(--color-audit-accent);
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.proximo-title {
		color: var(--color-white);
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		line-height: 1.15;
		font-weight: 700;
		margin: 0;
	}

	.text-accent {
		color: var(--color-audit-accent);
	}

	.proximo-desc {
		color: #d4d8e4;
		font-family: var(--font-body);
		font-size: var(--text-base);
		line-height: 1.5;
		margin: 0;
	}

	.brand-watermark {
		margin-top: auto;
		padding-top: 32px;
	}

	.brand-text {
		color: rgba(255, 255, 255, 0.1);
		font-family: var(--font-headline);
		font-size: var(--text-3xl);
		font-weight: 800;
		letter-spacing: -0.02em;
	}

	.proximo-widget {
		/* Fake glass effect for the inner widget box */
		background: rgba(20, 24, 39, 0.2);
		backdrop-filter: blur(6px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 24px;
		padding: 25px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 485px;
		flex-shrink: 0;
	}

	.widget-header {
		display: flex;
		align-items: center;
	}

	.widget-title {
		color: #d4d8e4;
		font-family: var(--font-body);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.widget-body {
		flex: 1;
		background: transparent;
		border: 1px dashed rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 128px;
	}

	.widget-placeholder {
		color: #d4d8e4;
		font-family: var(--font-body);
		font-size: var(--text-xs);
	}

	.btn-agendar {
		background: var(--color-audit-accent);
		color: var(--color-audit-bg);
		border: none;
		border-radius: 1000px;
		padding: 16px;
		font-family: var(--font-headline);
		font-size: var(--text-base);
		font-weight: 700;
		width: 100%;
		transition: transform var(--dur-fast) var(--ease-out-expo), box-shadow var(--dur-fast) var(--ease-out-expo);
	}

	.btn-agendar:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(214, 244, 122, 0.3);
	}

	/* ── Sprint R5: Mobile Responsive ── */
	@media (max-width: 768px) {
		.proximo-card {
			flex-direction: column;
			gap: 24px;
		}

		.proximo-widget {
			width: 100%;
			background: rgba(20, 24, 39, 0.6);
		}
	}
</style>
