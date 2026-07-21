<script lang="ts">
	import "../app.css";
	import type { Snippet } from "svelte";
	import PageLoadingOverlay from "../../cliente/PageLoadingOverlay.svelte";
	import ThemeToggle from "../../cliente/ThemeToggle.svelte";

	let { children }: { children: Snippet } = $props();
</script>

<PageLoadingOverlay />
<ThemeToggle />
{@render children()}
