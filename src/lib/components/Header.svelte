<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { Menu, X } from 'lucide-svelte';
	import { quintOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	const navLinks = [
		{ href: '/#home', key: 'nav.home', sectionId: 'home' },
		{ href: '/works', key: 'nav.works', sectionId: 'works-promo' },
		{ href: '/resume', key: 'nav.resume', sectionId: 'resume' }
	];

	const pathname = $derived($page.url.pathname);
	let activeSection = $state('');
	let isMenuOpen = $state(false);

	let isScrolled = $state(false);
	$effect(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 10;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	$effect(() => {
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
			{ rootMargin: '-50% 0px -50% 0px', threshold: 0 }
		);
		sections.forEach((section) => observer.observe(section));
		return () => sections.forEach((section) => observer.unobserve(section));
	});

	function scrollTo(selector: string) {
		const element = document.querySelector(selector);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function handleNavClick(event: MouseEvent, link: (typeof navLinks)[0]) {
		if (link.href.startsWith('/#') && pathname === '/') {
			event.preventDefault();
			scrollTo(link.href.substring(1));
		}
		isMenuOpen = false;
	}

	function isLinkActive(link: { href: string; sectionId: string }): boolean {
		const baseHref = link.href.split('#')[0];
		if (pathname === '/') {
			return activeSection === link.sectionId || (link.sectionId === 'home' && activeSection === '');
		}
		if (baseHref === '/') return false;
		return pathname.startsWith(baseHref);
	}
</script>

<header class:scrolled={isScrolled} class:open={isMenuOpen}>
	<div class="header-container">
		<a href="/" class="logo-link" aria-label="На главную" onclick={() => (isMenuOpen = false)}>
			<Logo />
		</a>

		<nav class="desktop-nav">
			<ul class="nav-links">
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							class:active={isLinkActive(link)}
							onclick={(e) => handleNavClick(e, link)}>{$t(link.key)}</a
						>
					</li>
				{/each}
			</ul>
			<LanguageSwitcher />
		</nav>

		<button
			class="burger-menu"
			onclick={() => (isMenuOpen = !isMenuOpen)}
			aria-label="Меню"
			aria-expanded={isMenuOpen}
		>
			{#key isMenuOpen}
				<div in:fade={{ duration: 150 }}>
					{#if isMenuOpen}
						<X size={28} />
					{:else}
						<Menu size={28} />
					{/if}
				</div>
			{/key}
		</button>
	</div>

	{#if isMenuOpen}
		<nav class="mobile-nav" transition:fade={{ duration: 200 }}>
			<ul class="mobile-nav-links">
				{#each navLinks as link, i}
					<li
						in:fly={{ y: -15, duration: 300, delay: 100 + i * 50, easing: quintOut }}
						out:fade={{ duration: 150 }}
					>
						<a
							href={link.href}
							class:active={isLinkActive(link)}
							onclick={(e) => handleNavClick(e, link)}>{$t(link.key)}</a
						>
					</li>
				{/each}
			</ul>
			<div
				class="mobile-lang-switcher"
				in:fly={{ y: -15, duration: 300, delay: 100 + navLinks.length * 50, easing: quintOut }}
				out:fade={{ duration: 150 }}
			>
				<LanguageSwitcher />
			</div>
		</nav>
	{/if}
</header>

<style>
	header {
		position: sticky;
		top: 1.5rem;
		left: 0;
		right: 0;
		width: 100%;
		padding: 0 2rem;
		z-index: 100;
		transition: top 0.3s ease;
		max-width: 1400px;
		margin: 0 auto;
	}

	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2.5rem;
		background-color: rgba(30, 30, 30, 0.65);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-radius: 50px;
		border: 1px solid var(--border-color);
		box-shadow: inset 0 1px 1px rgba(240, 234, 214, 0.1);
		transition:
			box-shadow 0.3s ease-out,
			border-radius 0.4s ease;
		position: relative;
		z-index: 102;
	}

	header.scrolled .header-container {
		box-shadow:
			inset 0 1px 1px rgba(240, 234, 214, 0.1),
			0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.logo-link {
		display: flex;
		align-items: center;
	}

	.desktop-nav {
		display: flex;
		align-items: center;
		gap: 2.5rem;
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
		padding: 0.5rem 0.25rem;
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
		bottom: -2px;
		left: 0;
		right: 0;
		height: 2px;
		background-color: var(--accent-color);
		border-radius: 2px;
	}

	.burger-menu {
		display: none;
		background: none;
		border: none;
		color: var(--text-color);
		cursor: pointer;
		z-index: 101;
		padding: 0;
		width: 28px;
		height: 28px;
	}

	.mobile-nav {
		display: none;
	}

	@media (max-width: 1024px) {
		.header-container {
			padding: 0.75rem 2rem;
		}
	}

	@media (max-width: 768px) {
		header {
			padding: 0 1.5rem;
			top: 1rem;
		}
		.header-container {
			padding: 0.5rem 1.5rem;
		}
		.desktop-nav {
			display: none;
		}
		.burger-menu {
			display: block;
		}

		header.open .header-container {
			border-radius: 24px 24px 0 0;
		}

		.mobile-nav {
			display: block;
			position: absolute;
			top: calc(100% - 25px);
			/* ✨ ИСПРАВЛЕНИЕ: Устанавливаем ширину и отступы как у родителя */
			left: 1.5rem;
			right: 1.5rem;
			padding: 40px 2.5rem 2.5rem;
			background-color: rgba(30, 30, 30, 0.85);
			backdrop-filter: blur(16px);
			-webkit-backdrop-filter: blur(16px);
			border: 1px solid var(--border-color);
			border-top: none;
			border-radius: 0 0 24px 24px;
			z-index: 101;
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		}

		.mobile-nav-links {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1.5rem;
		}
		.mobile-nav-links a {
			font-family: var(--font-primary);
			font-weight: 600;
			font-size: 1.5rem;
			text-decoration: none;
			color: var(--text-color);
			opacity: 0.7;
			transition: opacity 0.3s ease;
			position: relative;
			padding: 0.5rem 0.25rem;
		}
		.mobile-nav-links a:hover,
		.mobile-nav-links a.active {
			opacity: 1;
		}
		.mobile-nav-links a.active::after {
			content: '';
			position: absolute;
			bottom: -4px;
			left: 5%;
			right: 5%;
			height: 3px;
			background-color: var(--accent-color);
			border-radius: 3px;
		}
		.mobile-lang-switcher {
			margin-top: 2.5rem;
			display: flex;
			justify-content: center;
		}
	}
</style>