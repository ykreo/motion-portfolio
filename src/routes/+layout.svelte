<script lang="ts">
	import '$styles/global.css';
	import Header from '$components/Header.svelte';
	import Cursor from '$components/Cursor.svelte';
	import Background3D from '$components/Background3D.svelte';
	import FloatingControls from '$components/FloatingControls.svelte';
	// --- ✨ ИЗМЕНЕНИЕ: 'waitLocale' больше не нужен, так как загрузка происходит в +layout.ts ---
	import { locale } from 'svelte-i18n';
	import '$lib/i18n';

	let { children } = $props();

	// --- ✨ ИЗМЕНЕНИЕ: Этот блок $effect() больше не нужен, его можно полностью удалить ---
	// Загрузка локали теперь обрабатывается в `src/routes/+layout.ts`
</script>

{#if $locale}
	<Cursor />
	<Background3D />
	<Header />
	<FloatingControls />

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