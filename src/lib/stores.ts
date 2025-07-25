// src/lib/stores.ts
import { writable } from 'svelte/store';

// `true` — кастомный курсор включен, `false` — выключен (используется системный)
export const isCustomCursorEnabled = writable(true);