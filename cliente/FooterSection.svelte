<script lang="ts">
	import logoCiclo from "./assets/Logo-Ciclo17.svg?raw";
</script>

<section class="section-footer">
	<a href="/" class="footer-logo" aria-label="Ir a la página principal de Ciclo17">{@html logoCiclo}</a>
	<p class="footer-text">
		En <strong>Ciclo17</strong> diseñamos y desarrollamos sitios web de alto rendimiento y bajo impacto digital.
	</p>
</section>

<style>
	.section-footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 24px 0 64px 0;
		width: 100%;
		gap: 24px;
	}

	.footer-logo {
		display: flex;
		justify-content: center;
		transition: opacity var(--dur-fast) var(--ease-out-expo);
	}

	.footer-logo:hover {
		opacity: 0.75;
	}

	.footer-logo :global(svg) {
		height: 28px;
		width: auto;
	}

	.footer-text {
		color: var(--color-text-secondary);
		font-family: var(--font-headline);
		font-weight: 700;
		font-size: 17.9px;
		text-align: center;
		margin: 0;
	}

	.footer-text strong {
		color: var(--color-white);
	}
</style>
