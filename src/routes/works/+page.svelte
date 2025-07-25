<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Работы — YKREO</title>
</svelte:head>

<div class="works-container">
	<h1>{$t('nav.works')}</h1>
	<p>Здесь будет галерея ваших работ с категориями и тегами.</p>
</div>

<style>
	.works-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 5rem 2rem;
	}
	h1 {
		font-family: var(--font-primary);
		font-size: clamp(3rem, 10vw, 6.5rem);
		margin-bottom: 2rem;
	}
</style>