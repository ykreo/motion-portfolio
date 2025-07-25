// src/lib/i18n/index.ts
import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'ru';

register('en',() => import('./locales/en.json'));
register('ru',() => import('./locales/ru.json'));
register('ua',() =>import('./locales/ua.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale
});