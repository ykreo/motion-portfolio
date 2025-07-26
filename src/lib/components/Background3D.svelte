<script lang="ts">
	import * as THREE from 'three';

	let canvasEl: HTMLCanvasElement;

	$effect(() => {
		// --- СЦЕНА И КАМЕРА ---
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 50;

		// --- РЕНДЕРЕР ---
		const renderer = new THREE.WebGLRenderer({
			canvas: canvasEl,
			antialias: true,
			alpha: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// --- ТВОРЧЕСКАЯ ЧАСТЬ: СОЗДАЕМ PLEXUS-ЭФФЕКТ ---

		const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
		const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');

		const points: THREE.Vector3[] = [];
		const velocities: THREE.Vector3[] = [];
		const numPoints = 150; // Количество точек

		// 1. Создаем точки со случайными позициями и скоростями
		for (let i = 0; i < numPoints; i++) {
			const x = Math.random() * 100 - 50;
			const y = Math.random() * 100 - 50;
			const z = Math.random() * 100 - 50;
			points.push(new THREE.Vector3(x, y, z));
			velocities.push(new THREE.Vector3(
				(Math.random() - 0.5) * 0.1,
				(Math.random() - 0.5) * 0.1,
				(Math.random() - 0.5) * 0.1
			));
		}

		// 2. Геометрия для точек
		const pointsGeometry = new THREE.BufferGeometry().setFromPoints(points);
		const pointsMaterial = new THREE.PointsMaterial({
			color: textColor,
			size: 1.5,
			sizeAttenuation: false // Размер точек не меняется с расстоянием
		});
		const particles = new THREE.Points(pointsGeometry, pointsMaterial);
		scene.add(particles);

		// 3. Геометрия для линий
		const linesGeometry = new THREE.BufferGeometry();
		const linesMaterial = new THREE.LineBasicMaterial({
			color: accentColor,
			transparent: true,
			opacity: 0.2,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		});
		const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
		scene.add(lines);

		// --- ИНТЕРАКТИВНОСТЬ И АНИМАЦИЯ ---
		const mouse = new THREE.Vector2();
		const onMouseMove = (event: MouseEvent) => {
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 - 1;
		};
		window.addEventListener('mousemove', onMouseMove);
		
		let animationFrameId: number;
		const maxDistance = 10; // Максимальное расстояние для соединения точек

		const tick = () => {
			const positions = pointsGeometry.attributes.position.array as Float32Array;
			const linePositions = [];

			for (let i = 0; i < numPoints; i++) {
				const p = points[i];
				p.add(velocities[i]);

				// Отталкивание от границ
				if (p.x < -50 || p.x > 50) velocities[i].x *= -1;
				if (p.y < -50 || p.y > 50) velocities[i].y *= -1;
				if (p.z < -50 || p.z > 50) velocities[i].z *= -1;

				positions[i * 3] = p.x;
				positions[i * 3 + 1] = p.y;
				positions[i * 3 + 2] = p.z;

				// Проверяем расстояние до других точек
				for (let j = i + 1; j < numPoints; j++) {
					const p2 = points[j];
					const distance = p.distanceTo(p2);
					if (distance < maxDistance) {
						linePositions.push(p.x, p.y, p.z, p2.x, p2.y, p2.z);
					}
				}
			}
			
			// Обновляем геометрию
			pointsGeometry.attributes.position.needsUpdate = true;
			linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

			// Плавное вращение сцены за мышью
			scene.rotation.y += (mouse.x * 0.2 - scene.rotation.y) * 0.05;
			scene.rotation.x += (-mouse.y * 0.2 - scene.rotation.x) * 0.05;

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
			pointsGeometry.dispose();
			// --- ✨ ИСПРАВЛЕНИЕ: Опечатка в названии переменной ---
			pointsMaterial.dispose();
			linesGeometry.dispose();
			linesMaterial.dispose();
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