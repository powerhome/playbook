export type DisplayType = "none" | "flex" | "inline_flex" | "inline" | "inline_block" | "block"

export type Display = {
  display?: DisplayType,
} | DisplaySizes

export type DisplaySizes = {[key: string]: DisplayType | any}

export type None = "none"
