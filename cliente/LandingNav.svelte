<script lang="ts">
	import logoCiclo from "./assets/Logo-Ciclo17.svg?raw";
</script>

<nav class="landing-nav" aria-label="Navegación principal">
	<a href="/" class="nav-brand" aria-label="Ir al inicio">
		{@html logoCiclo}
	</a>
	<a href="/reporte" class="nav-cta">
		<span>Auditoría gratuita</span>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</a>
</nav>

<style>
	.landing-nav {
		position: fixed;
		top: 16px;
		left: 50%;
		transform: translateX(-50%);
		width: calc(100% - (var(--gutter) * 2));
		max-width: var(--content-max);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 7px 7px 7px 13px;
		border-radius: var(--radius-full);
		border: 0.73px solid var(--color-border-card);
		background:
			linear-gradient(90deg, rgba(22, 29, 58, 0.5), rgba(22, 29, 58, 0.5)),
			linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1));
		backdrop-filter: blur(8.8px);
		-webkit-backdrop-filter: blur(8.8px);
		z-index: 100;
	}

	.nav-brand {
		display: flex;
		align-items: center;
		text-decoration: none;
		transition: transform 0.3s var(--ease-out-expo);
	}

	.nav-brand:hover {
		transform: scale(1.05);
	}

	.nav-brand :global(svg) {
		height: 30px;
		width: auto;
		filter: drop-shadow(0 0 8px rgba(214, 244, 122, 0));
		transition: filter 0.3s var(--ease-out-expo);
	}

	.nav-brand:hover :global(svg) {
		filter: drop-shadow(0 0 12px rgba(214, 244, 122, 0.45));
	}

	.nav-cta {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 18px;
		min-height: 44px;
		border-radius: var(--radius-full);
		background: var(--color-primary);
		border: 1px solid var(--color-primary);
		color: var(--color-on-primary);
		font-family: var(--font-body);
		font-weight: 700;
		font-size: 13px;
		text-decoration: none;
		transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s var(--ease-out-expo);
		box-shadow: 0 0 8px rgba(218, 147, 255, 0.3);
		transform: translateY(0) translateZ(0);
		will-change: transform;
		backface-visibility: hidden;
		transform-style: preserve-3d;
	}

	.nav-cta > :global(*) {
		will-change: transform;
		backface-visibility: hidden;
		transform: translate3d(0, 0, 0);
	}

	.nav-cta:hover {
		transform: translateY(-2px) translateZ(0);
		box-shadow: 0 0 16px var(--color-primary-glow);
	}

	@media (max-width: 768px) {
		.landing-nav {
			top: 16px;
			width: calc(100% - 32px);
			padding: 6px 6px 6px 12px;
		}

		.nav-cta span {
			font-size: 11px;
		}
	}
</style>
