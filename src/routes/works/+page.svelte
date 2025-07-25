<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$t('nav.works')} — YKREO</title>
</svelte:head>

<div class="works-container">
	<h1>{$t('nav.works')}</h1>
	<p>{$t('works.description')}</p>

	<div class="gallery-controls">
		<div class="categories">
			<h2>{$t('works.categories.title')}</h2>
			<div class="category-buttons">
				<button class="active">{$t('works.categories.all')}</button>
				<button>{$t('works.categories.video')}</button>
				<button>{$t('works.categories.static')}</button>
			</div>
		</div>
		</div>

	<div class="gallery-placeholder">
		<p>{$t('works.placeholder')}</p>
	</div>
</div>

<style>
	.works-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 8rem 2rem 5rem;
	}
	h1 {
		font-family: var(--font-primary);
		font-size: clamp(3rem, 10vw, 6.5rem);
		margin-bottom: 1rem;
	}
	.works-container > p {
		max-width: 600px;
		color: rgba(240, 234, 214, 0.7);
		margin-bottom: 4rem;
	}

	.gallery-controls {
		margin-bottom: 4rem;
	}

	.categories h2 {
		font-family: var(--font-secondary);
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		opacity: 0.8;
	}

	.category-buttons {
		display: flex;
		gap: 1rem;
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
	
	.gallery-placeholder {
		width: 100%;
		max-width: 1400px;
		padding: 4rem;
		border: 2px dashed var(--border-color);
		border-radius: 20px;
		color: rgba(240, 234, 214, 0.5);
	}
</style>