<script lang="ts">
	import '$styles/global.css';
	import Header from '$components/Header.svelte';
	import Cursor from '$components/Cursor.svelte';
	// import Transition from '$components/Transition.svelte'; // <-- УДАЛИ ЭТУ СТРОКУ
	import Background3D from '$components/Background3D.svelte';
	import CursorToggle from '$components/CursorToggle.svelte';
	import { locale, waitLocale } from 'svelte-i18n';
	import '$lib/i18n';

	let { children } = $props();

	$effect(() => {
		async function init() {
			await waitLocale();
		}
		init();
	});
</script>

{#if $locale}
	<Cursor />
	<Background3D />
	<Header />
	<CursorToggle />

	<main>
		{@render children()}
	</main>
{/if}

<style>
	main {
		position: relative;
		z-index: 1;
	}
</style>