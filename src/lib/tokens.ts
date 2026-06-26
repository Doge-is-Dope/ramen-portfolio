import type {
  ColorToken,
  IconToken,
  RadiusToken,
  SpaceToken,
  TypeToken,
} from "@/lib/types";

export const colorTokens: readonly ColorToken[] = [
  { name: "--bg", label: "Background", light: "#ffffff", dark: "#0a0a0a" },
  { name: "--fg", label: "Foreground", light: "#000000", dark: "#f4f4f5" },
  { name: "--muted", label: "Muted", light: "#6b7280", dark: "#9ca3af" },
  { name: "--rule", label: "Rule", light: "#e5e7eb", dark: "#262626" },
] as const;

export const typeTokens: readonly TypeToken[] = [
  { name: "--fs-h1", label: "Display", sample: "Reason. Act. Monitor." },
  { name: "--fs-h2", label: "Section heading", sample: "How the loop runs" },
  {
    name: "--fs-dek",
    label: "Dek",
    sample: "A short standfirst that sits beneath the headline.",
  },
  {
    name: "--fs-body",
    label: "Body",
    sample: "Body copy carries the weight of the article.",
  },
  {
    name: "--fs-row-title",
    label: "Row title",
    sample: "List row heading",
  },
  { name: "--fs-meta", label: "Meta", sample: "Metadata and labels" },
  { name: "--fs-caption", label: "Caption", sample: "Figure caption" },
] as const;

export const spaceTokens: readonly SpaceToken[] = [
  { name: "--space-1", label: "4px" },
  { name: "--space-2", label: "8px" },
  { name: "--space-3", label: "12px" },
  { name: "--space-4", label: "16px" },
  { name: "--space-5", label: "20px" },
  { name: "--space-6", label: "24px" },
  { name: "--space-7", label: "28px" },
  { name: "--space-8", label: "32px" },
  { name: "--space-10", label: "40px" },
  { name: "--space-12", label: "48px" },
  { name: "--space-14", label: "56px" },
  { name: "--space-16", label: "64px" },
  { name: "--space-24", label: "96px" },
] as const;

export const semanticSpaceTokens: readonly SpaceToken[] = [
  { name: "--space-gutter", label: "Page gutter" },
  { name: "--space-section", label: "Section gap" },
  { name: "--space-hero-y", label: "Hero vertical" },
] as const;

export const iconTokens: readonly IconToken[] = [
  { name: "--icon-xs", label: "12px" },
  { name: "--icon-sm", label: "14px" },
  { name: "--icon-md", label: "16px" },
] as const;

export const radiusTokens: readonly RadiusToken[] = [
  { name: "--radius-xs", label: "XS" },
  { name: "--radius-sm", label: "SM" },
] as const;
