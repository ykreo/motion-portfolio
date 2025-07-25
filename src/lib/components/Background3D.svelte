<script lang="ts">
	import * as THREE from 'three';
	import { gsap } from 'gsap';

	let canvasEl: HTMLCanvasElement;

	$effect(() => {
		// --- ✨ СЦЕНА И КАМЕРА ---
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 2;

		// --- ✨ РЕНДЕРЕР ---
		const renderer = new THREE.WebGLRenderer({
			canvas: canvasEl,
			antialias: true,
			alpha: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// --- ✨ ТВОРЧЕСКАЯ ЧАСТЬ: СОЗДАЕМ ЧАСТИЦЫ ---

		// 1. Геометрия: Облако из 5000 точек
		const particlesGeometry = new THREE.BufferGeometry();
		const count = 5000;

		const positions = new Float32Array(count * 3); // Каждая точка имеет 3 координаты (x, y, z)
		const colors = new Float32Array(count * 3); // И 3 значения для цвета (r, g, b)

		const accentColor = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--accent-color'));
		const textColor = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--text-color'));

		for (let i = 0; i < count * 3; i++) {
			positions[i] = (Math.random() - 0.5) * 10; // Разбрасываем точки в кубе 10x10x10
			
            // Смешиваем два основных цвета для разнообразия
			const mixedColor = Math.random() > 0.7 ? accentColor : textColor;
			colors[i * 3 + 0] = mixedColor.r;
			colors[i * 3 + 1] = mixedColor.g;
			colors[i * 3 + 2] = mixedColor.b;
		}

		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		// 2. Материал: Маленькие, полупрозрачные точки
		const particlesMaterial = new THREE.PointsMaterial({
			size: 0.015,
			sizeAttenuation: true, // Частицы меньше, когда дальше
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending, // Красивый эффект свечения при наложении
			vertexColors: true // Используем цвета, которые задали выше
		});

		// 3. Создаем объект частиц
		const particles = new THREE.Points(particlesGeometry, particlesMaterial);
		scene.add(particles);

		// --- ✨ ОСВЕЩЕНИЕ (упрощенное, т.к. PointsMaterial не реагирует на свет) ---
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		// --- ✨ ИНТЕРАКТИВНОСТЬ И АНИМАЦИЯ ---
		let mouse = { x: 0, y: 0 };
		const onMouseMove = (e: MouseEvent) => {
			// Используем gsap для плавного обновления координат мыши
			gsap.to(mouse, {
				x: e.clientX,
				y: e.clientY,
				duration: 0.5,
				ease: 'power2.out'
			});
		};
		window.addEventListener('mousemove', onMouseMove);

		const clock = new THREE.Clock();
		let animationFrameId: number;

		const tick = () => {
			const elapsedTime = clock.getElapsedTime();

			// Анимация вращения всего облака
			particles.rotation.y = elapsedTime * 0.05;
			particles.rotation.x = elapsedTime * 0.02;

			// Анимация реакции на курсор: двигаем камеру
			camera.position.x += (mouse.x / window.innerWidth * 2 - camera.position.x) * 0.02;
			camera.position.y += (-(mouse.y / window.innerHeight * 2) - camera.position.y) * 0.02;
			camera.lookAt(scene.position);

			renderer.render(scene, camera);
			animationFrameId = requestAnimationFrame(tick);
		};
		tick();

		const onResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener('resize', onResize);

		// Функция очистки
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('resize', onResize);
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

<canvas bind:this={canvasEl} class="background-canvas"></canvas>

<style>
	.background-canvas {
		position: fixed;
		top: 0;
		left: 0;
		outline: none;
		z-index: -1;
	}
</style>