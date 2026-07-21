<script lang="ts">
	/**
	 * @component ThemeToggle
	 * @description Toggle global de tema light/dark. Consume utils/settings.svelte.ts
	 * (estado + persistencia en localStorage + atributo data-theme en <html>).
	 */
	import { settings } from "../utils/settings.svelte";
	import IconSun from "~icons/mynaui/sun";
	import IconMoon from "~icons/mynaui/moon";
</script>

<button
	type="button"
	class="theme-toggle"
	onclick={() => settings.toggleTheme()}
	aria-label={settings.theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
	aria-pressed={settings.theme === "dark"}
>
	{#if settings.theme === "dark"}
		<IconSun width="18" height="18" />
	{:else}
		<IconMoon width="18" height="18" />
	{/if}
</button>

<style>
	.theme-toggle {
		position: fixed;
		top: var(--space-4);
		right: var(--space-4);
		z-index: 999;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-full);
		background: var(--color-surface-base);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-card);
		cursor: pointer;
		transition: transform var(--dur-fast) var(--ease-in-out), background var(--dur-fast) var(--ease-in-out);
	}

	.theme-toggle:hover {
		background: var(--color-surface-muted);
		transform: translateY(-2px);
	}

	@media (prefers-reduced-motion: reduce) {
		.theme-toggle {
			transition: none;
		}
	}
</style>
