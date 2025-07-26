<script lang="ts">
	import { isCustomCursorEnabled } from '$lib/stores';
	import { MousePointer, MousePointer2, Linkedin, Send } from 'lucide-svelte';
	import { t } from 'svelte-i18n';

	const TELEGRAM_URL = 'https://t.me/ykreo';
	const LINKEDIN_URL = 'https://www.linkedin.com/in/converticube/';

	function toggleCursor() {
		isCustomCursorEnabled.update((enabled) => !enabled);
	}
</script>

<div class="floating-controls">
	<a
		href={TELEGRAM_URL}
		target="_blank"
		rel="noopener noreferrer"
		aria-label={$t('controls.telegram')}
		title={$t('controls.telegram')}
	>
		<Send size={20} />
	</a>
	<a
		href={LINKEDIN_URL}
		target="_blank"
		rel="noopener noreferrer"
		aria-label={$t('controls.linkedin')}
		title={$t('controls.linkedin')}
	>
		<Linkedin size={20} />
	</a>

	<button
		class="cursor-toggle"
		onclick={toggleCursor}
		aria-label={$t($isCustomCursorEnabled ? 'controls.hide_cursor' : 'controls.show_cursor')}
		title={$t($isCustomCursorEnabled ? 'controls.hide_cursor' : 'controls.show_cursor')}
	>
		{#if $isCustomCursorEnabled}
			<MousePointer size={20} />
		{:else}
			<MousePointer2 size={20} />
		{/if}
	</button>
</div>

<style>
	.floating-controls {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.floating-controls > * {
		background-color: var(--surface-color);
		border: 1px solid var(--border-color);
		border-radius: 50%;
		width: 48px;
		height: 48px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		color: var(--text-color);
		opacity: 0.5;
		transition: all 0.3s ease;
	}

	.floating-controls > *:hover {
		opacity: 1;
		transform: scale(1.1);
		border-color: var(--accent-color);
	}

	/* Скрываем переключатель курсора на мобильных и планшетах */
	@media (pointer: coarse), (max-width: 1024px) {
		.cursor-toggle {
			display: none;
		}
	}
</style>