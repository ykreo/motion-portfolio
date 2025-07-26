<script lang="ts">
	import { t } from 'svelte-i18n';
	import { works, type Work } from '$lib/works';
	import Gallery from '$lib/components/Gallery.svelte';

	// --- Состояния для фильтров (остаются без изменений) ---
	let activeCategory: 'all' | 'video' | 'static' = $state('all');
	let activeTags = $state<string[]>([]);

	// --- ✨ ИСПРАВЛЕНИЕ: Список всех тегов теперь просто константа ---
	// Мы вычисляем его один раз, так как исходный массив работ не меняется.
	const allTags = [...new Set(works.flatMap((work) => work.tags))];

	// Создаем реактивное состояние для отфильтрованных работ.
	let filteredWorks = $state<Work[]>(works);

	// Используем $effect, чтобы "реагировать" на изменения фильтров
	// и обновлять наш отфильтрованный массив.
	$effect(() => {
		filteredWorks = works.filter((work) => {
			const categoryMatch = activeCategory === 'all' || work.category === activeCategory;
			const tagsMatch =
				activeTags.length === 0 || activeTags.every((tag) => work.tags.includes(tag));
			return categoryMatch && tagsMatch;
		});
	});

	function selectCategory(category: 'all' | 'video' | 'static') {
		activeCategory = category;
	}

	function toggleTag(tag: string) {
		const index = activeTags.indexOf(tag);
		if (index === -1) {
			// Svelte 5 корректно отслеживает мутации для $state
			activeTags.push(tag);
		} else {
			activeTags.splice(index, 1);
		}
	}
</script>

<svelte:head>
	<title>{$t('nav.works')} — {$t('hero.title')}</title>
</svelte:head>

<div class="works-container">
	<h1>{$t('nav.works')}</h1>
	<p>{$t('works.description')}</p>

	<div class="gallery-controls">
		<div class="categories">
			<h2>{$t('works.categories.title')}</h2>
			<div class="category-buttons">
				<button class:active={activeCategory === 'all'} onclick={() => selectCategory('all')}>
					{$t('works.categories.all')}
				</button>
				<button class:active={activeCategory === 'video'} onclick={() => selectCategory('video')}>
					{$t('works.categories.video')}
				</button>
				<button class:active={activeCategory === 'static'} onclick={() => selectCategory('static')}>
					{$t('works.categories.static')}
				</button>
			</div>
		</div>
		<div class="tags">
			<h2>Теги</h2>
			<div class="tag-buttons">
				{#each allTags as tag}
					<button class:active={activeTags.includes(tag)} onclick={() => toggleTag(tag)}>
						{tag}
					</button>
				{/each}
			</div>
		</div>
	</div>

	{#if filteredWorks.length > 0}
		<Gallery works={filteredWorks} />
	{:else}
		<div class="gallery-placeholder">
			<p>Проектов с такими фильтрами не найдено.</p>
		</div>
	{/if}
</div>

<style>
	/* Стили остаются без изменений */
	.works-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 5rem clamp(1.5rem, 5vw, 2rem);
	}
	h1 {
		font-family: var(--font-primary);
		font-size: clamp(2.5rem, 8vw, 5.5rem); /* Немного изменим значения для лучшей читаемости */
		margin-bottom: 1rem;
		view-transition-name: works-title;
	}
	.works-container > p {
		max-width: 600px;
		color: rgba(240, 234, 214, 0.7);
		margin-bottom: 4rem;
	}
	.gallery-controls {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		margin-bottom: 4rem;
		width: 100%;
		max-width: 800px;
		align-items: center;
	}
	.categories h2, .tags h2 {
		font-family: var(--font-secondary);
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		opacity: 0.8;
	}
	.category-buttons, .tag-buttons {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}
	.category-buttons {
		background-color: var(--surface-color);
		padding: 0.5rem;
		border-radius: 50px;
		border: 1px solid var(--border-color);
	}
	.category-buttons button {
		background: none;
		border: none;
		color: var(--text-color);
		font-family: var(--font-secondary);
		font-weight: 600;
		cursor: pointer;
		opacity: 0.6;
		transition: all 0.3s ease;
		padding: 0.8rem 1.8rem;
		border-radius: 30px;
	}
	.category-buttons button:hover,
	.category-buttons button.active {
		opacity: 1;
		background-color: var(--accent-color);
		color: var(--background-color);
	}
	.tag-buttons button {
		background: none;
		border: 1px solid var(--border-color);
		color: var(--text-color);
		font-family: var(--font-secondary);
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		opacity: 0.7;
		transition: all 0.3s ease;
		padding: 0.5rem 1.2rem;
		border-radius: 20px;
	}
	.tag-buttons button:hover {
		opacity: 1;
		border-color: var(--accent-color);
	}
	.tag-buttons button.active {
		opacity: 1;
		background-color: var(--accent-color);
		color: var(--background-color);
		border-color: var(--accent-color);
	}
	.gallery-placeholder {
		width: 100%;
		max-width: 1400px;
		padding: 4rem;
		border: 2px dashed var(--border-color);
		border-radius: 20px;
		color: rgba(240, 234, 214, 0.5);
	}
</style>