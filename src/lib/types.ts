export type Profile = {
  name: string;
  role: string;
  reviewPeriod: string;
  kicker: string;
  headline: string;
  dek: string;
  linkedin: string;
  github: string;
};

export type ArticleFigureProps = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type ArticleDiagram = {
  kind: "system" | "runtime" | "browser-relay";
  caption: string;
};

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  figure?: ArticleFigureProps;
  diagram?: ArticleDiagram;
};

export type ColorToken = {
  name: string;
  label: string;
  light: string;
  dark: string;
};

export type TypeToken = {
  name: string;
  label: string;
  sample: string;
};

export type SpaceToken = {
  name: string;
  label: string;
};

export type IconToken = {
  name: string;
  label: string;
};

export type RadiusToken = {
  name: string;
  label: string;
};

export type WorkCategory =
  | "Agent loop"
  | "Streaming"
  | "Browser automation"
  | "Chat UI"
  | "Architecture"
  | "Performance";

export type WorkSurface = "Backend" | "Frontend";

export type YearMonth = `${number}-${number}`;

export type WorkEntry = {
  id: string;
  title: string;
  summary: string;
  category: WorkCategory;
  surface: WorkSurface;
  shippedAt: YearMonth;
  updatedAt?: YearMonth;
};
