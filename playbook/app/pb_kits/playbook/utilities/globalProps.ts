type Sizes = "xs" | "sm" | "md" | "lg" | "xl"
type None = "none"

type AllSizes = None & Sizes

type Margin = {
  marginRight?: AllSizes,
  marginLeft?: AllSizes,
  marginTop?: AllSizes,
  marginBottom?: AllSizes,
  marginX?: AllSizes,
  marginY?: AllSizes,
  margin?: AllSizes,
}

type Padding = {
  paddingRight?: AllSizes,
  paddingLeft?: AllSizes,
  paddingTop?: AllSizes,
  paddingBottom?: AllSizes,
  paddingX?: AllSizes,
  paddingY?: AllSizes,
  padding?: AllSizes,
}

type Dark = {
  dark?: boolean,
}

type NumberSpacing = {
  numberSpacing?: "tabular",
}

type MaxWidth = {
  maxWidth?: Sizes,
}

type ZIndex = {
  zIndex?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
}

type Shadow = {
  shadow?: "none" | "deep" | "deeper" | "deepest",
}

type LineHeight = {
  lineHeight?: "loosest" | "looser" | "loose" | "normal" | "tight" | "tighter" | "tightest",
}

type Display = {
  display?: "block" | "flex" | "hidden" | "inline_block" | "inline" | "inline_flex",
}

type Cursor = {
  cursor?: "pointer",
}

type BorderRadius = {
  borderRadius?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "rounded",
}

type FlexDirection = {
  flexDirection?: "row" | "column" | "row_reverse" | "column_reverse",
}

export type GlobalProps = BorderRadius & Cursor & Dark & Display & LineHeight & Margin & MaxWidth & NumberSpacing & Padding & Shadow & ZIndex

// Prop categories
const PROP_CATEGORIES: {[key:string]: (props: {[key: string]: any}) => string} = {
  spacingProps: ({
    marginRight,
    marginLeft,
    marginTop,
    marginBottom,
    marginX,
    marginY,
    margin,
    paddingRight,
    paddingLeft,
    paddingTop,
    paddingBottom,
    paddingX,
    paddingY,
    padding,
  }: Margin & Padding) => {
    let css = ''
    css += marginRight ? `mr_${marginRight} ` : ''
    css += marginLeft ? `ml_${marginLeft} ` : ''
    css += marginTop ? `mt_${marginTop} ` : ''
    css += marginBottom ? `mb_${marginBottom} ` : ''
    css += marginX ? `mx_${marginX} ` : ''
    css += marginY ? `my_${marginY} ` : ''
    css += margin ? `m_${margin} ` : ''
    css += paddingRight ? `pr_${paddingRight} ` : ''
    css += paddingLeft ? `pl_${paddingLeft} ` : ''
    css += paddingTop ? `pt_${paddingTop} ` : ''
    css += paddingBottom ? `pb_${paddingBottom} ` : ''
    css += paddingX ? `px_${paddingX} ` : ''
    css += paddingY ? `py_${paddingY} ` : ''
    css += padding ? `p_${padding} ` : ''
    return css
  },
  darkProps: ({ dark }: Dark) => {
    let css = ''
    css += dark ? 'dark' : ''
    return css
  },
  numberSpacingProps: ({ numberSpacing }: NumberSpacing) => {
    let css = ''
    css += numberSpacing ? `ns_${numberSpacing} ` : ''
    return css
  },
  maxWidthProps: ({ maxWidth }: MaxWidth) => {
    let css = ''
    css += maxWidth ? `max_width_${maxWidth } ` : ''
    return css
  },
  zIndexProps: ({ zIndex }: ZIndex) => {
    let css = ''
    css += zIndex ? `z_index_${zIndex } ` : ''
    return css
  },
  shadowProps: ({ shadow }: Shadow) => {
    let css = ''
    css += shadow ? `shadow_${shadow} ` : ''
    return css
  },
  lineHeightProps: ({ lineHeight }: LineHeight) => {
    let css = ''
    css += lineHeight ? `line_height_${lineHeight} ` : ''
    return css
  },
  displayProps: ({ display }: Display) => {
    let css = ''
    css += display ? `display_${display} ` : ''
    return css
  },
  cursorProps: ({ cursor }: Cursor) => {
    let css = ''
    css += cursor ? `cursor_${cursor} ` : ''
    return css
  },
  flexDirectionProps: ({ flexDirection }: FlexDirection) => {
    let css = ''
    css += flexDirection ? `flexDirection_${flexDirection} ` : ''
    return css
  }
}

// All Exported as a single function
export const globalProps = (props: GlobalProps, defaultProps: {[key: string]: string} | {} = {}): string => {
  const allProps = { ...props, ...defaultProps }
  return Object.keys(PROP_CATEGORIES).map((key) => {
    return PROP_CATEGORIES[key](allProps)
  }).join("")
}

export const deprecatedProps = (kit: string, props: string[] = []): void => {
  if (process.env.NODE_ENV === 'development') {
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    props.forEach((prop) => {
      console.warn(`${kit} Kit: The prop '${prop}' is deprecated and will be removed in a future release!`)
    })
  }
}
