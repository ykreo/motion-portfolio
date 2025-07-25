<script lang="ts">
	import type { Work } from '$lib/works';

	let { work } = $props< { work: Work }>();
</script>

<div class="work-card">
	<div class="image-container">
		<img src={work.image} alt={work.title} />
	</div>
	<div class="info">
		<h3>{work.title}</h3>
		<div class="tags">
			{#each work.tags as tag}
				<span>{tag}</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.work-card {
		background-color: var(--surface-color);
		border-radius: 16px;
		border: 1px solid var(--border-color);
		overflow: hidden;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.work-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
		border-color: rgba(242, 255, 74, 0.5);
	}

	.image-container {
		width: 100%;
		aspect-ratio: 4 / 3; /* Сохраняем пропорции изображения */
		background-color: #2a2a2a;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover; /* Изображение будет заполнять контейнер, сохраняя пропорции */
		display: block;
	}

	.info {
		padding: 1rem 1.25rem;
		text-align: left;
	}

	h3 {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tags span {
		background-color: rgba(240, 234, 214, 0.05);
		color: rgba(240, 234, 214, 0.7);
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 500;
	}
</style>