<script lang="ts">
	import '$styles/global.css';
	import Header from '$components/Header.svelte';
	import Cursor from '$components/Cursor.svelte';
	import Transition from '$components/Transition.svelte';
	import Background3D from '$components/Background3D.svelte';
	import { locale, waitLocale } from 'svelte-i18n';
	import '$lib/i18n';

	// ИЗМЕНЕНИЕ ЗДЕСЬ: Объявляем, что компонент принимает 'children'
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
	<Transition />
	<Background3D />
	<Header />

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