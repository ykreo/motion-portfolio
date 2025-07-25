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
		image: '/images/works/work-1.jpg',
		category: 'video',
		tags: ['Motion Graphics', 'Blender', 'After Effects']
	},
	{
		id: 2,
		title: 'Project Beta',
		image: '/images/works/work-2.jpg',
		category: 'static',
		tags: ['Branding', 'Figma', 'Illustrator']
	},
	{
		id: 3,
		title: 'Project Gamma',
		image: '/images/works/work-3.jpg',
		category: 'video',
		tags: ['VFX', 'Cinema 4D']
	},
	{
		id: 4,
		title: 'Project Delta',
		image: '/images/works/work-4.jpg',
		category: 'static',
		tags: ['Typography', 'Figma']
	},
	{
		id: 5,
		title: 'Project Epsilon',
		image: '/images/works/work-5.jpg',
		category: 'video',
		tags: ['Motion Graphics', 'Houdini']
	},
	{
		id: 6,
		title: 'Project Zeta',
		image: '/images/works/work-6.jpg',
		category: 'static',
		tags: ['Branding', 'Typography']
	}
	// Добавляй сюда больше своих работ по мере необходимости
];