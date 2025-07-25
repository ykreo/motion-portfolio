<script lang="ts">
	import type { Work } from '$lib/works';
	import WorkCard from './WorkCard.svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	let { works } = $props<{ works: Work[] }>();

	// Анимация для появления/исчезновения карточек
	const [send, receive] = crossfade({
		duration: 300,
		easing: quintOut,
		fallback: (node, params) => {
			// Резервная анимация для элементов, которые не анимируются кроссфейдом
			return {
				duration: 200,
				easing: quintOut,
				css: (t) => `transform: scale(${t}); opacity: ${t}`
			};
		}
	});
</script>

<div class="gallery-grid">
	{#each works as work (work.id)}
		<div in:receive={{ key: work.id }} out:send={{ key: work.id }}>
			<WorkCard {work} />
		</div>
	{/each}
</div>

<style>
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
		width: 100%;
		max-width: 1400px;
	}

	@media (max-width: 768px) {
		.gallery-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		}
	}
</style>