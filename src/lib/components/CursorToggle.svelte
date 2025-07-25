<script lang="ts">
    import { isCustomCursorEnabled } from '$lib/stores';
    import { MousePointer, MousePointer2 } from 'lucide-svelte';

    function toggleCursor() {
        isCustomCursorEnabled.update(enabled => !enabled);
    }
</script>

<button 
    class="cursor-toggle" 
    onclick={toggleCursor}
    aria-label="Переключить вид курсора"
    title="Переключить вид курсора"
>
    {#if $isCustomCursorEnabled}
        <MousePointer size={20} />
    {:else}
        <MousePointer2 size={20} />
    {/if}
</button>

<style>
    .cursor-toggle {
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        z-index: 1000;
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

    .cursor-toggle:hover {
        opacity: 1;
        transform: scale(1.1);
        border-color: var(--accent-color);
    }
</style>