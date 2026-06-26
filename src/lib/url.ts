const raw = import.meta.env.BASE_URL;

const basePath = raw.endsWith("/") ? raw : `${raw}/`;

export function withBase(path: string): string {
  return path.startsWith("/") ? `${basePath}${path.slice(1)}` : path;
}
