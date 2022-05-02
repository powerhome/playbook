export type Display = {
  display?: "block" | "flex" | "hidden" | "inline_block" | "inline" | "inline_flex",
} | DisplaySizes

export type DisplayType = "hidden" | "flex" | "inline" | "inline_block" | "block"

export type DisplaySizes = {[key: string]: DisplayType | any}

export type None = "none"
