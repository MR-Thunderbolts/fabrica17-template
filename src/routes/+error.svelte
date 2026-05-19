<script lang="ts">
	import { page } from '$app/stores';
	import IconArrowLeft from "~icons/ph-bold/arrow-left";
</script>

<svelte:head>
	<title>{$page.status} - Error</title>
</svelte:head>

<main class="page-error">
	<div class="container">
		<h1 class="error-code">{$page.status}</h1>
		<h2 class="error-title">
			<span class="text-accent">Algo salió mal</span>
		</h2>
		<p class="error-desc">
			{$page.error?.message || "Lo sentimos, ha ocurrido un error interno en el servidor."}
		</p>
		
		<button type="button" class="btn-volver" onclick={() => history.back()}>
			<IconArrowLeft width="16" height="16" /> Volver atrás
		</button>
	</div>
</main>

<style>
	:global(.page-error) {
		background-color: var(--color-audit-bg, #141827) !important;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-audit-fg, white) !important;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 24px;
		max-width: 600px;
		padding: 0 24px;
	}

	.error-code {
		font-family: var(--font-headline);
		font-size: 160px;
		font-weight: 800;
		color: rgba(255, 255, 255, 0.05);
		margin: 0;
		line-height: 1;
		letter-spacing: -4px;
	}

	.error-title {
		font-family: var(--font-headline);
		font-size: 40px;
		font-weight: 700;
		color: white;
		margin: 0;
		letter-spacing: -1px;
	}

	.text-accent {
		color: var(--color-audit-accent, #d6f47a);
	}

	.error-desc {
		font-family: var(--font-body);
		font-size: 18px;
		color: #d4d8e4;
		margin: 0;
		line-height: 1.5;
	}

	.btn-volver {
		margin-top: 16px;
		background: var(--color-audit-accent, #d6f47a);
		color: var(--color-audit-bg, #141827);
		border: none;
		border-radius: 1000px;
		padding: 16px 32px;
		font-family: var(--font-headline);
		font-size: 16px;
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.btn-volver:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(214, 244, 122, 0.3);
	}
</style>
