<script lang="ts">
	import { animateTitle } from '$lib/utils/actions';
	import { t } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { BrainCircuit, Layers, Sparkles } from 'lucide-svelte';

	const titleText = $derived($t('hero.title'));

	const features = [
		{
			icon: Sparkles,
			titleKey: 'features.experience.title',
			descriptionKey: 'features.experience.description'
		},
		{
			icon: Layers,
			titleKey: 'features.quantity.title',
			descriptionKey: 'features.quantity.description'
		},
		{
			icon: BrainCircuit,
			titleKey: 'features.ai.title',
			descriptionKey: 'features.ai.description'
		}
	];

	// Анимация для секции с преимуществами
	let featuresSectionEl: HTMLElement;
	let featuresVisible = $state(false); // ИСПРАВЛЕНИЕ: Объявляем как состояние

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						featuresVisible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 } // Анимация начнется, когда 10% секции будет видно
		);

		if (featuresSectionEl) {
			observer.observe(featuresSectionEl);
		}

		return () => {
			if (featuresSectionEl) {
				observer.unobserve(featuresSectionEl);
			}
		};
	});
</script>

<svelte:head>
	<title>YKREO — {titleText}</title>
	<meta name="description" content="Портфолио, где дизайн встречается с кодом." />
</svelte:head>

<div class="page-container">
	<section id="home" class="hero-container">
		{#key titleText}
			<h1 class="title" use:animateTitle>
				{titleText}
			</h1>
		{/key}

		<p class="subtitle" in:fly={{ y: 20, duration: 800, delay: 400 }}>
			{$t('hero.subtitle')}
		</p>
	</section>

	<section id="features" class="features-container" bind:this={featuresSectionEl}>
		<div class="features-grid">
			{#each features as feature, i}
				{#if featuresVisible}
					<div
						class="feature-card"
						in:fly={{ y: 25, duration: 700, delay: 100 + i * 150, easing: quintOut }}
					>
						<div class="icon-wrapper">
							<svelte:component this={feature.icon} size={32} />
						</div>
						<h3>{$t(feature.titleKey)}</h3>
						<p>{$t(feature.descriptionKey)}</p>
					</div>
				{/if}
			{/each}
		</div>
	</section>

	<section id="works-promo" class="works-promo-container">
		<h2 id="works-title">{$t('works_promo.title')}</h2>
		<a href="/works" class="cta-button" role="button">{$t('works_promo.cta')}</a>
	</section>
</div>

<style>
	.hero-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 5rem clamp(1.5rem, 5vw, 2rem);
		min-height: 90vh; /* ИЗМЕНЕНО: Уменьшили высоту, чтобы страница не была такой пустой */
	}

	.title {
		font-family: var(--font-primary);
		font-size: clamp(3rem, 10vw, 6.5rem);
		font-weight: 800;
		line-height: 1;
		color: var(--text-color);
		margin-bottom: 2rem;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	}
	.subtitle {
		font-size: clamp(1.1rem, 3vw, 1.5rem);
		max-width: 600px;
		color: rgba(240, 234, 214, 0.7);
	}

	.features-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 10rem clamp(1.5rem, 5vw, 2rem); /* ИЗМЕНЕНО: Увеличены вертикальные отступы для баланса */
		background-color: rgba(0, 0, 0, 0.1);
		border-top: 1px solid var(--border-color);
		border-bottom: 1px solid var(--border-color);
		width: 100%;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* ИЗМЕНЕНО: Карточки стали немного шире */
		gap: 2.5rem;
		width: 100%;
		max-width: 1400px; /* ИЗМЕНЕНО: Сетка стала шире на больших экранах */
		margin: 0 auto;
	}

	.feature-card {
		background-color: var(--surface-color);
		border: 1px solid var(--border-color);
		border-radius: 16px;
		padding: 2.5rem 2rem;
		text-align: left;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
	}

	.feature-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		border-color: var(--accent-color);
	}

	.icon-wrapper {
		background-color: var(--accent-color);
		color: var(--background-color);
		width: 64px;
		height: 64px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.feature-card h3 {
		font-family: var(--font-primary);
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		color: var(--text-color);
	}

	.feature-card p {
		color: rgba(240, 234, 214, 0.7);
		line-height: 1.6;
	}

	.works-promo-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 10rem clamp(1.5rem, 5vw, 2rem); /* ИЗМЕНЕНО: Сделали адекватные отступы вместо 100vh */
	}

	#works-title {
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
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}
	.cta-button:hover {
		transform: scale(1.05);
		box-shadow: 0 0 25px rgba(242, 255, 74, 0.5);
	}

	@media (max-width: 768px) {
		.features-container {
			padding: 4rem clamp(1.5rem, 5vw, 2rem);
		}
		.feature-card {
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>