<script lang="ts">
	import Logo from '$components/Logo.svelte';
	import { page } from '$app/stores';

	const pathname = $derived($page.url.pathname);
</script>

<header>
	<nav>
		<a href="/" class="logo-link" aria-label="На главную">
			<Logo />
		</a>
		<ul class="nav-links">
			<li><a href="/" class:active={pathname === '/'}>Главная</a></li>
			
			<li><a href="/works" class:active={pathname.startsWith('/works')}>Работы</a></li>
			<li><a href="/contact" class:active={pathname.startsWith('/contact')}>Контакт</a></li>
		</ul>
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
</style>