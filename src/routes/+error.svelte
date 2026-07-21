<script lang="ts">
	import { page } from '$app/stores';
	import IconArrowLeft from "~icons/mynaui/arrow-left";
</script>

<svelte:head>
	<title>{$page.status} - Error</title>
</svelte:head>

<main class="page-error">
	<div class="container">
		<h1 class="error-code">{$page.status}</h1>
		<h2 class="error-title">Algo salió mal</h2>
		<p class="error-desc">
			{$page.error?.message || "Lo sentimos, ha ocurrido un error interno en el servidor."}
		</p>

		<button type="button" class="btn-volver" onclick={() => history.back()}>
			<IconArrowLeft width="16" height="16" /> Volver atrás
		</button>
	</div>
</main>

<style>
	.page-error {
		background-color: var(--color-neutral-bg);
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-body);
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-6);
		max-width: 600px;
		padding: 0 var(--space-6);
	}

	.error-code {
		font-family: var(--font-headline);
		font-size: 160px;
		font-weight: 800;
		color: var(--color-surface-dark);
		margin: 0;
		line-height: 1;
		letter-spacing: -4px;
	}

	.error-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-text-heading);
		margin: 0;
		letter-spacing: -1px;
	}

	.error-desc {
		font-family: var(--font-body);
		font-size: var(--text-md);
		color: var(--color-text-secondary);
		margin: 0;
		line-height: 1.5;
	}

	.btn-volver {
		margin-top: var(--space-4);
		background: var(--color-primary);
		color: var(--color-primary-foreground);
		border: none;
		border-radius: var(--radius-full);
		padding: var(--space-4) var(--space-8);
		font-family: var(--font-headline);
		font-size: var(--text-base);
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: var(--space-3);
		cursor: pointer;
		transition: transform var(--dur-fast) var(--ease-in-out), box-shadow var(--dur-fast) var(--ease-in-out);
	}

	.btn-volver:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}
</style>
