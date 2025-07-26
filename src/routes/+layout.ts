import { browser } from '$app/environment';
import '$lib/i18n'; // Важно импортировать для инициализации
import { locale, waitLocale } from 'svelte-i18n';

export const load = async () => {
	if (browser) {
		// Устанавливаем локаль на основе языка браузера
		locale.set(window.navigator.language);
	}
	// Ждем, пока загрузится нужный файл локализации
	await waitLocale();

	// Возвращаем язык, чтобы SvelteKit мог добавить его в атрибут <html lang="">
	const lang = browser ? window.navigator.language : 'ru';
	return { lang };
};