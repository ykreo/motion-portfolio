<script lang="ts">
	import { animateTitle } from '$lib/utils/actions';
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>YKREO — {$t('hero.title')}</title>
	<meta name="description" content="Портфолио, где дизайн встречается с кодом." />
</svelte:head>

<div class="page-container">
	<section id="home" class="hero-container">
		<h1 class="title" use:animateTitle>
			{$t('hero.title')}
		</h1>
		<p class="subtitle">
			{$t('hero.subtitle')}
		</p>
	</section>

	<section id="works-promo" class="works-promo-container">
		<h2>{$t('works_promo.title')}</h2>
		<a href="/works" class="cta-button" role="button">{$t('works_promo.cta')}</a>
	</section>
</div>

<style>
	.page-container > section {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 5rem 2rem;
	}

	/* Стили для Hero секции */
	.hero-container {
		justify-content: center;
	}
	.title {
		font-family: var(--font-primary);
		font-size: clamp(3rem, 10vw, 6.5rem);
		font-weight: 800;
		line-height: 1;
		color: var(--text-color);
		margin-bottom: 2rem;
		/* Важно для работы SplitType */
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	}
	.subtitle {
		font-size: clamp(1.1rem, 3vw, 1.5rem);
		max-width: 600px;
		color: rgba(240, 234, 214, 0.7);
	}

	/* --- ✨ ИСПРАВЛЕНИЕ: Объединил дублирующиеся стили в один блок --- */
	.works-promo-container h2 {
		font-family: var(--font-primary);
		font-size: clamp(2.5rem, 8vw, 5rem);
		margin-bottom: 3rem;
		view-transition-name: works-title;
	}

	.cta-button {
		font-family: var(--font-primary);
		font-weight: 600;
		font-size: 1.2rem;
		color: var(--background-color);
		background-color: var(--accent-color);
		border-radius: 50px;
		padding: 1rem 2.5rem;
		text-decoration: none;
		transition: transform 0.3s ease;
	}
	.cta-button:hover {
		transform: scale(1.05);
	}
</style>