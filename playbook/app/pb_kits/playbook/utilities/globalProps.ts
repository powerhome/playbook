import { omit } from 'lodash'
import { camelToSnakeCase } from './text'

import {
  Binary,
  Display,
  DisplaySizes,
  None,
  Sizes,
} from '../types'

type Alignment = "start" | "end" | "center"

type AlignContent = {
  alignContent?: Alignment & Space
}

type AlignItems = {
  alignItems?: Alignment & ("flexStart" | "flexEnd" | "stretch" | "baseline")
}

type AlignSelf = {
  alignSelf?: Alignment & ("auto" | "stretch" | "baseline")
}
type AllSizes = None | Sizes

type BorderRadius = {
  borderRadius?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "rounded",
}

type Cursor = {
  cursor?: "pointer",
}

type Dark = {
  dark?: boolean,
}

type Flex = {
  flex?: "auto" | "initial" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none",
}

type FlexDirection = {
  flexDirection?: "row" | "column" | "rowReverse" | "columnReverse"
}

type FlexGrow = {
  flexGrow?: 0 | 1
}

type FlexShrink = {
  flexShrink?: Binary
}

type FlexWrap = {
  flexWrap?: "wrap" | "nowrap" | "wrapReverse"
}

type JustifyContent = {
  justifyContent?: Alignment & Space
}

type JustifySelf = {
  justifySelf?: Alignment & ("auto" | "stretch")
}

type LineHeight = {
  lineHeight?: "loosest" | "looser" | "loose" | "normal" | "tight" | "tighter" | "tightest",
}

type Margin = {
  marginRight?: AllSizes,
  marginLeft?: AllSizes,
  marginTop?: AllSizes,
  marginBottom?: AllSizes,
  marginX?: AllSizes,
  marginY?: AllSizes,
  margin?: AllSizes,
}

type MaxWidth = {
  maxWidth?: Sizes,
}

type NumberSpacing = {
  numberSpacing?: "tabular",
}

type Order = {
  order?: None| "first" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
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

type Shadow = {
  shadow?: "none" | "deep" | "deeper" | "deepest",
}

type Space = "spaceBetween" | "spaceAround" | "spaceEvenly"

type ZIndex = {
  zIndex?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
}

// keep this as the last type definition
export type GlobalProps = AlignContent & AlignItems & AlignSelf &
  BorderRadius & Cursor & Dark & Display & DisplaySizes & Flex & FlexDirection &
  FlexGrow & FlexShrink & FlexWrap & JustifyContent & JustifySelf &
  LineHeight & Margin & MaxWidth & NumberSpacing & Order & Padding &
  Shadow & ZIndex

const getResponsivePropClasses = (prop: {[key: string]: string}, classPrefix: string) => {
  const keys: string[] = Object.keys(prop)
  return keys.map((size: Sizes) => {
    const propValue: string = typeof(prop[size]) === 'string' ? camelToSnakeCase(prop[size]) : prop[size]
    return `${classPrefix}_${size}_${propValue}`
  }).join(" ")
}

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
  darkProps: ({ dark }: Dark) => dark ? 'dark' : '',
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
  displayProps: (display: Display ) => {
    let css = ''
    Object.entries(display).forEach((displayEntry) => {
      if (displayEntry[0] == "display") {
        if (typeof displayEntry[1] == "string") {
          css += `display_${displayEntry[1]} `
        } else if (typeof displayEntry[1] == "object") {
          Object.entries(displayEntry[1]).forEach((displayObj) => {
            css += `display_${displayObj[0]}_${displayObj[1]} `
          })
        } else {
          ' '
        }
      }
    })
    return css
  },
  cursorProps: ({ cursor }: Cursor) => {
    let css = ''
    css += cursor ? `cursor_${cursor} ` : ''
    return css
  },
  alignContentProps: ({ alignContent }: AlignContent) => {
    if (typeof alignContent === 'object') {
      return getResponsivePropClasses(alignContent, 'align_content')
    }
    return alignContent ? `align_content_${camelToSnakeCase(alignContent)}` : ''
  },
  alignItemsProps: ({ alignItems }: AlignItems) => {
    if (typeof alignItems === 'object') {
      return getResponsivePropClasses(alignItems, 'align_items')
    } else {
      return alignItems ? `align_items_${camelToSnakeCase(alignItems)}` : ''
    }
  },
  alignSelfProps: ({ alignSelf }: AlignSelf) => {
    if (typeof alignSelf === 'object') {
      return getResponsivePropClasses(alignSelf, 'align_self')
    } else {
      return alignSelf ? `align_self_${alignSelf}` : ''
    }
  },
  flexDirectionProps: ({ flexDirection }: FlexDirection) => {
    if (typeof flexDirection == 'object') {
      return getResponsivePropClasses(flexDirection, 'flex_direction')
    } else {
      return flexDirection ? `flex_direction_${camelToSnakeCase(flexDirection)}` : ''
    }
  },
  flexWrapProps: ({ flexWrap }: FlexWrap) => {
    if (typeof flexWrap == 'object') {
      return getResponsivePropClasses(flexWrap, 'flex_wrap')
    } else {
      return flexWrap ? `flex_wrap_${camelToSnakeCase(flexWrap)}` : ''
    }
  },
  flexProps: ({ flex }: Flex) => {
    if (typeof flex === 'object') {
      return getResponsivePropClasses(flex, 'flex')
    } else {
      return flex ? `flex_${flex}` : ''
    }
  },
  flexGrowProps: ({ flexGrow }: FlexGrow) => {
    if (typeof flexGrow == 'object') {
      return getResponsivePropClasses(flexGrow, 'flex_grow')
    } else {
      return flexGrow ? `flex_grow_${flexGrow}` : ''
    }
  },
  flexShrinkProps: ({ flexShrink }: FlexShrink) => {
    if (typeof flexShrink == 'object') {
      return getResponsivePropClasses(flexShrink, 'flex_shrink')
    } else {
      return flexShrink ? `flex_shrink_${flexShrink}` : ''
    }
  },
  justifyContentProps: ({ justifyContent }: JustifyContent) => {
    if (typeof justifyContent === 'object') {
      return getResponsivePropClasses(justifyContent, 'justify_content')
    } else {
      return justifyContent ? `justify_content_${camelToSnakeCase(justifyContent)}` : ''
    }
  },
  justifySelfProps: ({ justifySelf }: JustifySelf) => {
    if (typeof justifySelf === 'object') {
      return getResponsivePropClasses(justifySelf, 'justify_self')
    } else {
      return justifySelf ? `justify_self_${justifySelf}` : ''
    }
  },
  orderProps: ({ order }: Order) => {
    if (typeof order === 'object') {
      return getResponsivePropClasses(order, 'flex_order')
    } else {
      return order ? `flex_order_${order}` : ''
    }
  }
}

type DefaultProps = {[key: string]: string} | Record<string, unknown>

export const globalProps = (props: GlobalProps, defaultProps: DefaultProps = {}): string => {
  const allProps = { ...props, ...defaultProps }
  return Object.keys(PROP_CATEGORIES).map((key) => {
    return PROP_CATEGORIES[key](allProps)
  }).filter((value) => value?.length > 0).join(" ")
}

export const deprecatedProps = (kit: string, props: string[] = []): void => {
  if (process.env.NODE_ENV === 'development') {
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    props.forEach((prop) => {
      console.warn(`${kit} Kit: The prop '${prop}' is deprecated and will be removed in a future release!`)
    })
  }
}

export const domSafeProps = (props: {[key: string]: string}): {[key: string]: string} => {
  const notSafeProps = [
    'marginRight',
    'marginLeft',
    'marginTop',
    'marginBottom',
    'marginX',
    'marginY',
    'margin',
    'paddingRight',
    'paddingLeft',
    'paddingTop',
    'paddingBottom',
    'paddingX',
    'paddingY',
    'padding',
    'dark',
  ]
  return omit(props, notSafeProps)
}