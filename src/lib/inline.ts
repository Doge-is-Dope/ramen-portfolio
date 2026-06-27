export type InlinePart =
  | string
  | { code: string }
  | { strong: string }
  | { link: { text: string; href: string } };

export function splitInline(text: string): InlinePart[] {
  return text
    .split("`")
    .flatMap((part, i) => (i % 2 === 1 ? { code: part } : splitLinks(part)));
}

function splitLinks(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > lastIndex) {
      parts.push(...splitStrong(text.slice(lastIndex, match.index)));
    }

    parts.push({ link: { text: match[1], href: match[2] } });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(...splitStrong(text.slice(lastIndex)));
  }

  return parts;
}

function splitStrong(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const pattern = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push({ strong: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
