<script lang="ts" module>
	/**
	 * Dialog context shared between all sub-components.
	 * Uses Svelte 5 context to avoid prop drilling.
	 */
	import { setContext, getContext } from 'svelte';

	const DIALOG_KEY = Symbol('fabrica-dialog');

	export interface DialogState {
		open: boolean;
		toggle: () => void;
		close: () => void;
		labelId: string;
	}

	export function setDialogContext(state: DialogState) {
		setContext(DIALOG_KEY, state);
	}

	export function getDialogContext(): DialogState {
		return getContext<DialogState>(DIALOG_KEY);
	}
</script>

<script lang="ts">
	/**
	 * @component Dialog.Root
	 * @description State container for the Dialog compound.
	 * Manages open/close state and provides context to sub-components.
	 */
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		children
	}: {
		open?: boolean;
		children?: Snippet;
	} = $props();

	const labelId = `fabrica-dialog-${Math.random().toString(36).slice(2, 8)}`;

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}

	setDialogContext({
		get open() { return open; },
		toggle,
		close,
		labelId
	});
</script>

{#if children}
	{@render children()}
{/if}
