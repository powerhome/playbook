export type PanelDropdownClassPrefix = "props-panel" | "playground-panel";

export function panelDropdownClassName(
  prefix: PanelDropdownClassPrefix,
  filled: boolean,
): string {
  const base = `${prefix}-dropdown`;
  return filled ? `${base} ${base}--filled` : base;
}
