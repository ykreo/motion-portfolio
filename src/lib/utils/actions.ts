import { gsap } from 'gsap';
import SplitType from 'split-type';

export function animateTitle(node: HTMLElement) {
    const chars = new SplitType(node, { types: 'chars' }).chars;

    gsap.from(chars, {
        yPercent: 100,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
    });
}