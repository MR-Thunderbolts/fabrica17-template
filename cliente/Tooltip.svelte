<script lang="ts">
	import IconInfo from "~icons/mynaui/info-circle";
	import IconX from "~icons/mynaui/x";

	let { title, description, learnMoreUrl, position = "top", absolute = false } = $props<{
		title: string;
		description: string;
		learnMoreUrl?: string;
		position?: "top" | "bottom" | "left" | "right";
		absolute?: boolean;
	}>();

	let isOpen = $state(false);
	let tooltipRef: HTMLDivElement | undefined = $state();

	function toggle(e: Event) {
		e.stopPropagation();
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape" && isOpen) close();
	}

	function handleOutsideClick(e: MouseEvent) {
		if (isOpen && tooltipRef && !tooltipRef.contains(e.target as Node)) {
			close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} onclick={handleOutsideClick} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
	class="tooltip-container"
	class:is-absolute={absolute}
	bind:this={tooltipRef}
>
	<button 
		type="button" 
		class="tooltip-trigger" 
		onclick={toggle} 
		aria-expanded={isOpen}
		aria-label="Más información sobre {title}"
	>
		<IconInfo width="18" height="18" />
	</button>

	{#if isOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div class="tooltip-popup {position}" role="tooltip" onclick={(e) => e.stopPropagation()}>
			<div class="tooltip-header">
				<strong class="tooltip-title">{title}</strong>
				<button type="button" class="btn-close" onclick={close} aria-label="Cerrar tooltip">
					<IconX width="14" height="14" />
				</button>
			</div>
			<p class="tooltip-desc">{description}</p>
			{#if learnMoreUrl}
				<a href={learnMoreUrl} class="tooltip-link">Conoce más</a>
			{/if}
			<div class="tooltip-arrow"></div>
		</div>
	{/if}
</div>

<style>
	.tooltip-container {
		display: inline-flex;
		position: relative;
	}

	.tooltip-container.is-absolute {
		position: absolute;
		top: 16px;
		right: 16px;
	}

	.tooltip-trigger {
		background: transparent;
		border: none;
		color: var(--color-accent-primary);
		cursor: pointer;
		padding: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: opacity var(--dur-fast) var(--ease-out-expo);
	}
	
	.tooltip-trigger:hover, .tooltip-trigger[aria-expanded="true"] {
		opacity: 0.75;
	}

	.tooltip-popup {
		position: absolute;
		z-index: 100;
		width: 260px;
		background: var(--color-surface-base);
		border: 1px solid var(--color-accent-primary);
		border-radius: 14px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
		text-align: left;
		/* Animación via `translate` CSS individual — NO conflicta con transform de posicionamiento */
		translate: 0 0;
		opacity: 1;
		animation: tooltipFadeIn 0.2s var(--ease-out-expo) both;
	}

	/* Top positioning — usa transform solo para centrado horizontal */
	.tooltip-popup.top {
		bottom: calc(100% + 14px);
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 8px;
	}

	.tooltip-title {
		color: var(--color-white);
		font-family: var(--font-headline);
		font-size: var(--text-base);
		font-weight: 700;
		margin: 0;
	}

	.btn-close {
		background: transparent;
		border: none;
		color: var(--color-text-muted);
		cursor: pointer;
		padding: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color var(--dur-fast);
	}

	.btn-close:hover {
		color: var(--color-white);
	}

	.tooltip-desc {
		color: var(--color-text-secondary);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		line-height: 1.4;
		margin: 0;
	}

	.tooltip-link {
		color: var(--color-white);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		text-decoration: underline;
		margin-top: 4px;
		display: inline-block;
	}

	.tooltip-link:hover {
		color: var(--color-accent-primary);
	}

	.tooltip-arrow {
		position: absolute;
		width: 12px;
		height: 12px;
		background: var(--color-surface-base);
		border-right: 1px solid var(--color-accent-primary);
		border-bottom: 1px solid var(--color-accent-primary);
	}

	.tooltip-popup.top .tooltip-arrow {
		bottom: -6.5px;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
	}

	/* Keyframes usan `translate` (propiedad individual) — compone SOBRE `transform`,
	   no lo sobreescribe. Elimina el glitch en tablet donde el media query cambia
	   el transform de posicionamiento durante la animación. */
	@keyframes tooltipFadeIn {
		from { opacity: 0; translate: 0 8px; }
		to   { opacity: 1; translate: 0 0; }
	}
	
	@media (max-width: 768px) {
		/* Ajuste para que el tooltip no se salga por la derecha en mobile/tablet */
		.tooltip-popup.top {
			transform: translateX(-82%);
		}
		.tooltip-popup.top .tooltip-arrow {
			left: 82%;
		}
	}
</style>
