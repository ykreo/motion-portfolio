<script lang="ts">
	import { animateTitle } from '$lib/utils/actions';
</script>

<svelte:head>
	<title>YKREO — Креативный разработчик</title>
	<meta name="description" content="Портфолио, где дизайн встречается с кодом." />
</svelte:head>

<div class="hero-container">
	<h1 class="title" use:animateTitle>
		Creative Developer
	</h1>
	<p class="subtitle">
		Создаю цифровые миры, которые живут и дышат, объединяя эстетику и функциональность.
	</p>
	<a href="/works" class="cta-button" role="button">Изучить проекты</a>
</div>

<style>
	.hero-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 0 2rem;
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
		margin-bottom: 3rem;
		color: rgba(240, 234, 214, 0.7);
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