export type InlinePart = string | { code: string } | { strong: string };

export function splitInline(text: string): InlinePart[] {
  return text
    .split("`")
    .flatMap((part, i) => (i % 2 === 1 ? { code: part } : splitStrong(part)));
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
