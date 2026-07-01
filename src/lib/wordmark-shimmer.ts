const SHIMMER_CLASS = "is-shimmering";

export function playShimmer(el: HTMLElement | null): void {
	if (!el) return;
	el.classList.remove(SHIMMER_CLASS);
	void el.offsetWidth;
	el.classList.add(SHIMMER_CLASS);
}

export function bindHoverShimmer(el: HTMLElement | null): void {
	if (!el || el.dataset.shimmerBound) return;
	el.dataset.shimmerBound = "true";

	el.addEventListener("mouseenter", () => {
		el.classList.add(SHIMMER_CLASS);
	});

	el.addEventListener("animationend", (event) => {
		if (event.pseudoElement === "::before") {
			el.classList.remove(SHIMMER_CLASS);
		}
	});
}
