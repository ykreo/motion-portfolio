// Описываем, как выглядит один проект в нашем портфолио
export interface Work {
	id: number;
	title: string;
	image: string; // Путь к изображению
	category: 'video' | 'static';
	tags: string[];
}

// Создаем массив с примерами твоих работ
export const works: Work[] = [
	{
		id: 1,
		title: 'Project Alpha',
		image: 'src/images/works/2024-08-23-01.28.57-1.jpg',
		category: 'video',
		tags: ['Motion Graphics', 'Blender', 'After Effects']
	},
	{
		id: 2,
		title: 'Project Beta',
		image: 'src/images/works/2024-08-23-01.31.47-1.jpg',
		category: 'static',
		tags: ['Branding', 'Figma', 'Illustrator']
	},
	{
		id: 3,
		title: 'Project Gamma',
		image: 'src/images/works/2024-08-23-01.41.09-1.jpg',
		category: 'video',
		tags: ['VFX', 'Cinema 4D']
	},
	{
		id: 4,
		title: 'Project Delta',
		image: 'src/images/works/2024-08-23-01.41.13-1.jpg',
		category: 'static',
		tags: ['Typography', 'Figma']
	},
	{
		id: 5,
		title: 'Project Epsilon',
		image: 'src/images/works/Converti-post-tg-ch-1.png',
		category: 'video',
		tags: ['Motion Graphics', 'Houdini']
	},
	{
		id: 6,
		title: 'Project Zeta',
		image: 'src/images/works/crypto-invest-1.png',
		category: 'static',
		tags: ['Branding', 'Typography']
	}
	// Добавляй сюда больше своих работ по мере необходимости
];