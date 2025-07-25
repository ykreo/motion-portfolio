<script lang="ts">
	import { locale } from 'svelte-i18n';

	const languages = [
		{ code: 'ua', name: 'UA' },
		{ code: 'en', name: 'EN' },
		{ code: 'ru', name: 'RU' }
	];

	function changeLocale(lang: string) {
		locale.set(lang);
	}
</script>

<div class="lang-switcher">
	{#each languages as lang, i}
		<button
			class:active={lang.code === $locale}
			onclick={() => changeLocale(lang.code)}
			type="button"
		>
			{lang.name}
		</button>
		{#if i < languages.length - 1}
			<span>/</span>
		{/if}
	{/each} </div>

<style>
	.lang-switcher {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--surface-color);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		border: 1px solid var(--border-color);
	}
	button {
		background: none;
		border: none;
		color: var(--text-color);
		font-family: var(--font-secondary);
		font-weight: 600;
		cursor: pointer;
		opacity: 0.5;
		transition: opacity 0.3s ease;
		padding: 0;
	}
	button:hover,
	button.active {
		opacity: 1;
	}
	span {
		opacity: 0.3;
	}
</style>