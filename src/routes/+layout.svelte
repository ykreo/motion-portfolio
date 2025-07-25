<script lang="ts">
	import '$styles/global.css';
	import Header from '$components/Header.svelte';
	import Cursor from '$components/Cursor.svelte';
	import Transition from '$components/Transition.svelte';
	import Background3D from '$components/Background3D.svelte';
	import { locale, waitLocale } from 'svelte-i18n';
	import '$lib/i18n'; // Импортируем для инициализации

	// Этот Svelte 5 snippet гарантирует, что мы дождемся загрузки языка
	// перед тем как рендерить страницу, чтобы избежать "мелькания" текста.
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
		<slot />
	</main>
{/if}

<style>
	main {
		position: relative;
		z-index: 1;
	}
</style>