// The sweep is class-driven (`is-shimmering`), not a `:hover` rule, so once it
// starts it always finishes even if the pointer leaves mid-sweep.

const SHIMMER_CLASS = "is-shimmering";

/** Replay the sweep from the start. */
export function playShimmer(el: HTMLElement | null): void {
  if (!el) return;
  el.classList.remove(SHIMMER_CLASS);
  void el.offsetWidth; // reflow so the animation restarts
  el.classList.add(SHIMMER_CLASS);
}

/** Bind hover-to-shimmer once. Cleared on animationend, not mouseleave. */
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
