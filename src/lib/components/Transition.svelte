<script lang="ts">
	import { navigating } from '$app/stores';
</script>

{#if $navigating}
	<div class="transition-overlay">
		<div class="gate"></div>
	</div>
{/if}

<style>
	.transition-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 10000;
		pointer-events: none;
	}
	.gate {
		width: 100%;
		height: 100%;
		background-color: var(--accent-color);
		transform-origin: bottom;
		animation: slide-in 0.5s cubic-bezier(0.83, 0, 0.17, 1);
	}

	@keyframes slide-in {
		from { transform: scaleY(0); }
		to { transform: scaleY(1); }
	}
</style>