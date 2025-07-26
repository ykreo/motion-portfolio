<script lang="ts">
	import type { Work } from '$lib/works';
	let { work } = $props<{ work: Work }>();
	let cardEl: HTMLAnchorElement;

	function handleMouseMove(event: MouseEvent) {
		const rect = cardEl.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const rotateX = (y / rect.height - 0.5) * -15; // Наклон по X
		const rotateY = (x / rect.width - 0.5) * 15;   // Наклон по Y

		cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
	}

	function handleMouseLeave() {
		cardEl.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
	}
</script>

<a
	href={`/works/${work.id}`}
	class="work-card"
	bind:this={cardEl}
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
>
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
</a>

<style>
	.work-card {
		background-color: var(--surface-color);
		border-radius: 16px;
		border: 1px solid var(--border-color);
		overflow: hidden;
		display: block; /* Чтобы ссылка занимала всю ширину */
		text-decoration: none; /* Убираем подчеркивание у ссылки */
		color: inherit; /* Наследуем цвет текста */
		transition: all 0.2s ease-out;
	}

	.work-card:hover {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
		border-color: rgba(242, 255, 74, 0.5);
	}

	.image-container {
		width: 100%;
		aspect-ratio: 4 / 3;
		background-color: #2a2a2a;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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