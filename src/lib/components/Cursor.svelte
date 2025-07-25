<script lang="ts">
	import { gsap } from 'gsap';

	let cursorEl: HTMLDivElement;
	let followerEl: HTMLDivElement;
	let isHovering = $state(false);

	// Используем $effect, который сработает один раз при монтировании компонента
	$effect(() => {
		// --- НАША НОВАЯ ЛОГИКА ---
		// Принудительно прячем курсор на всем документе
		document.documentElement.style.cursor = 'none';
        
        // Дополнительно вешаем обработчик, чтобы подавлять любые попытки
        // других скриптов или стилей вернуть курсор
		document.addEventListener('mouseover', () => {
			if (document.documentElement.style.cursor !== 'none') {
				document.documentElement.style.cursor = 'none';
			}
		});
        // -------------------------

		const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		const mouse = { x: pos.x, y: pos.y };
		const speed = 0.1;

		const xSet = gsap.quickSetter(followerEl, "x", "px");
		const ySet = gsap.quickSetter(followerEl, "y", "px");
        const xSetDot = gsap.quickSetter(cursorEl, "x", "px");
        const ySetDot = gsap.quickSetter(cursorEl, "y", "px");

		const onMouseMove = (e: MouseEvent) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
		window.addEventListener('mousemove', onMouseMove);

		const update = () => {
			const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
			pos.x += (mouse.x - pos.x) * dt;
			pos.y += (mouse.y - pos.y) * dt;
			xSet(pos.x);
			ySet(pos.y);
            xSetDot(mouse.x);
            ySetDot(mouse.y);
		};
		gsap.ticker.add(update);

		const onMouseEnter = () => isHovering = true;
		const onMouseLeave = () => isHovering = false;

		const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
		interactiveElements.forEach((el) => {
			el.addEventListener('mouseenter', onMouseEnter);
			el.addEventListener('mouseleave', onMouseLeave);
            // Дополнительно для надежности
            (el as HTMLElement).style.cursor = 'none';
		});

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			gsap.ticker.remove(update);
			interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
            // Возвращаем курсор при уходе со страницы (на всякий случай)
            document.documentElement.style.cursor = '';
		};
	});
</script>

<div class="cursor-dot" bind:this={cursorEl}></div>
<div class="cursor-follower" class:hovering={isHovering} bind:this={followerEl}></div>


<style>
	.cursor-dot,
	.cursor-follower {
		position: fixed;
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 9999;
		border-radius: 50%;
	}
	.cursor-dot {
		width: 8px;
		height: 8px;
		background-color: var(--accent-color);
	}
	.cursor-follower {
		width: 40px;
		height: 40px;
		border: 1px solid var(--border-color);
		transition: transform 0.3s ease-out, background-color 0.3s ease-out;
	}
	.cursor-follower.hovering {
		transform: translate(-50%, -50%) scale(1.5);
		background-color: rgba(255, 215, 0, 0.2);
	}
	@media (pointer: coarse) {
		.cursor-dot, .cursor-follower {
			display: none;
		}
	}
</style>