<script lang="ts">
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$t('nav.resume')} — {$t('hero.title')}</title>
</svelte:head>

<div class="resume-container">
	<h1>{$t('nav.resume')}</h1>
	<p>{$t('resume.placeholder')}</p>
</div>

<style>
	.resume-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 5rem clamp(1.5rem, 5vw, 2rem);
	}
	h1 {
		font-family: var(--font-primary);
		font-size: clamp(2.5rem, 8vw, 5.5rem); /* Аналогично */
		margin-bottom: 2rem;
	}
</style>