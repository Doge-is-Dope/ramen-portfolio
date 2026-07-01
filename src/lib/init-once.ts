export function initOnce(key: string, register: () => void): void {
	const w = window as unknown as Record<string, boolean>;
	if (w[key]) return;
	w[key] = true;
	register();
}
