<script lang="ts">
	import '$styles/global.css';
	import Header from '$components/Header.svelte';
	import Cursor from '$components/Cursor.svelte';
	import Background3D from '$components/Background3D.svelte';
	import FloatingControls from '$components/FloatingControls.svelte';
	import { locale } from 'svelte-i18n';
	import '$lib/i18n';
	import { onMount } from 'svelte';

	let { children } = $props();
	onMount(() => {
		const updateAurora = (e: MouseEvent) => {
			document.documentElement.style.setProperty('--aurora-x', `${e.clientX}px`);
			document.documentElement.style.setProperty('--aurora-y', `${e.clientY}px`);
		};

		window.addEventListener('mousemove', updateAurora);

		return () => {
			window.removeEventListener('mousemove', updateAurora);
		};
	});
</script>

{#if $locale}
	<div class="aurora-background"></div>
	<Cursor />
	<Background3D />
	<Header />
	<FloatingControls />

	<main>
		{@render children()}
	</main>
{/if}

<style>
	:global(:root) {
		--aurora-x: 50%;
		--aurora-y: 50%;
	}
	.aurora-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
		background: radial-gradient(
			800px circle at var(--aurora-x) var(--aurora-y),
			rgba(242, 255, 74, 0.1),
			transparent 80%
		);
		transition: background 0.3s ease-out;
	}
	main {
		position: relative;
		z-index: 1;
	}
</style>