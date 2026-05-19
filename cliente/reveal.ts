/**
 * Svelte action: use:reveal
 * Adds `.revealed` class when element enters viewport.
 * Supports stagger delay via data-delay attribute.
 */
export function reveal(node: HTMLElement) {
	// Respect prefers-reduced-motion
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) {
		node.classList.add('revealed');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const delay = node.dataset.delay ? parseInt(node.dataset.delay) : 0;
					if (delay > 0) {
						setTimeout(() => node.classList.add('revealed'), delay);
					} else {
						node.classList.add('revealed');
					}
					observer.unobserve(node);
				}
			});
		},
		{ threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
