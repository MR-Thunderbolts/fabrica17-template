<script lang="ts">
	import "../app.css";
	import type { Snippet } from "svelte";
	import PageLoadingOverlay from "../../cliente/PageLoadingOverlay.svelte";

	let { children }: { children: Snippet } = $props();
</script>

<PageLoadingOverlay />
{@render children()}
