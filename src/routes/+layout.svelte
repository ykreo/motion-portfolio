<script lang="ts">
	import '$styles/global.css';
	import Header from '$components/Header.svelte';
	import Cursor from '$components/Cursor.svelte';
	import Transition from '$components/Transition.svelte';
	import Background3D from '$components/Background3D.svelte';
</script>

<Cursor />
<Transition />
<Background3D />
<Header />

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		z-index: 1;
	}
</style>