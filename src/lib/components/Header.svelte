<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { Linkedin, Send } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const pathname = $derived($page.url.pathname);
	let activeSection = $state('');

	onMount(() => {
		if (pathname !== '/') {
			activeSection = '';
			return;
		}

		const sections = document.querySelectorAll('section[id]');
		if (!sections.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{
				rootMargin: '-50% 0px -50% 0px',
				threshold: 0
			}
		);

		sections.forEach((section) => {
			observer.observe(section);
		});

		return () => {
			sections.forEach((section) => {
				observer.unobserve(section);
			});
		};
	});

	const TELEGRAM_URL = 'https://t.me/ykreo';
	const LINKEDIN_URL = 'https://www.linkedin.com/in/converticube/';

	function scrollTo(selector: string) {
		const element = document.querySelector(selector);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function handleHomeNav(event: MouseEvent, selector: string) {
		if (pathname === '/') {
			event.preventDefault();
			scrollTo(selector);
		}
	}
</script>

<header>
	<nav>
		<a
			href="/"
			class="logo-link"
			aria-label="На главную"
			onclick={(e) => handleHomeNav(e, '#home')}
		>
			<Logo />
		</a>
		<ul class="nav-links">
			<li>
				<a
					href="/#home"
					class:active={pathname === '/' && (activeSection === 'home' || activeSection === '')}
					onclick={(e) => handleHomeNav(e, '#home')}>{$t('nav.home')}</a
				>
			</li>
			<li>
				<a
					href="/works"
					class:active={pathname.startsWith('/works') ||
						(pathname === '/' && activeSection === 'works-promo')}>{$t('nav.works')}</a
				>
			</li>
			<li>
				<a href="/resume" class:active={pathname.startsWith('/resume')}>{$t('nav.resume')}</a>
			</li>
		</ul>
		<div class="controls">
			<div class="social-links">
				<a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
					<Send size={20} />
				</a>
				<a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
					<Linkedin size={20} />
				</a>
			</div>
			<LanguageSwitcher />
		</div>
	</nav>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 2rem 3rem;
		z-index: 100;
	}
	nav {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.nav-links {
		display: flex;
		gap: 2.5rem;
		list-style: none;
	}
	.nav-links a {
		font-family: var(--font-primary);
		font-weight: 600;
		font-size: 1rem;
		text-decoration: none;
		color: var(--text-color);
		position: relative;
		padding: 0.5rem 0;
		opacity: 0.7;
		transition: opacity 0.3s ease;
	}
	.nav-links a:hover {
		opacity: 1;
	}
	.nav-links a.active {
		opacity: 1;
	}
	.nav-links a.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 5px;
		height: 5px;
		background-color: var(--accent-color);
		border-radius: 50%;
	}
	.controls {
		display: flex;
		align-items: center;
		gap: 2rem;
	}
	.social-links {
		display: flex;
		gap: 1.5rem;
	}
	.social-links a {
		color: var(--text-color);
		opacity: 0.7;
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}
	.social-links a:hover {
		opacity: 1;
		transform: scale(1.1);
	}
</style>