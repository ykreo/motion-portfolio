<script lang="ts">
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let canvasEl: HTMLCanvasElement;

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 2.5;

		const renderer = new THREE.WebGLRenderer({
			canvas: canvasEl,
			antialias: true,
			alpha: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Создаем красивую геометрию (Икосаэдр)
		const geometry = new THREE.IcosahedronGeometry(1, 1);
		
		// Основной материал
		const material = new THREE.MeshStandardMaterial({
			color: new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--accent-color')),
			roughness: 0.5,
			metalness: 0.7
		});

		// Материал для "сетки"
		const wireframeMaterial = new THREE.MeshBasicMaterial({
			color: new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--text-color')),
			wireframe: true,
			transparent: true,
			opacity: 0.1
		});

		const mesh = new THREE.Mesh(geometry, material);
		const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
		mesh.add(wireframe);

		scene.add(mesh);

		// Освещение
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);
		const pointLight = new THREE.PointLight(0xffffff, 20);
		pointLight.position.set(5, 5, 5);
		scene.add(pointLight);

		// Вращение мышью
		let mouse = { x: 0, y: 0 };
		window.addEventListener('mousemove', (e) => {
			mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
		});

		const clock = new THREE.Clock();
		const tick = () => {
			const elapsedTime = clock.getElapsedTime();
			// Плавное вращение + реакция на мышь
			mesh.rotation.y = elapsedTime * 0.1 + mouse.x * 0.2;
			mesh.rotation.x = -elapsedTime * 0.1 - mouse.y * 0.2;

			renderer.render(scene, camera);
			requestAnimationFrame(tick);
		};
		tick();

		// Адаптивность
		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		});
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