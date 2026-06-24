export type ResponsivePreviewPresetId =
  | "full"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl";

export type ResponsivePreviewPreset = {
  id: ResponsivePreviewPresetId;
  label: string;
  width: number | null;
};

/** Playbook breakpoint presets (see global-props / screen size tokens). */
export const RESPONSIVE_PREVIEW_PRESETS: ResponsivePreviewPreset[] = [
  { id: "full", label: "Full", width: null },
  { id: "xs", label: "XS", width: 575 },
  { id: "sm", label: "SM", width: 576 },
  { id: "md", label: "MD", width: 768 },
  { id: "lg", label: "LG", width: 992 },
  { id: "xl", label: "XL", width: 1200 },
];

export const RESPONSIVE_PREVIEW_MIN_WIDTH = 320;

export const getBreakpointLabel = (width: number): string => {
  if (width >= 1200) return "XL";
  if (width >= 992) return "LG";
  if (width >= 768) return "MD";
  if (width >= 576) return "SM";
  return "XS";
};

export const getPresetById = (id: ResponsivePreviewPresetId) =>
  RESPONSIVE_PREVIEW_PRESETS.find((preset) => preset.id === id) ??
  RESPONSIVE_PREVIEW_PRESETS[0];
