import { omit } from './object'
import { camelToSnakeCase } from './text'

import {
  BitValues,
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
  alignItems?: Alignment | ("flexStart" | "flexEnd" | "stretch" | "baseline")
}

type AlignSelf = {
  alignSelf?: Alignment & ("auto" | "stretch" | "baseline")
}
type AllSizes = None | Sizes | "auto" | "initial" | "inherit"

type BorderRadius = {
  borderRadius?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "rounded",
}

type Cursor = {
  cursor?: "auto" | "default" | "none" | "contextMenu" | "help" | "pointer" | "progress" | "wait" | "cell" |
  "crosshair" | "text" | "verticalText" | "alias" | "copy" | "move" | "noDrop" | "notAllowed" | "grab" |
  "grabbing" | "eResize" | "nResize" | "neResize" | "nwResize" | "sResize" | "seResize" | "swResize" | "wResize" |
  "ewResize" | "nsResize" | "neswResize" | "nwseResize" | "colResize" | "rowResize" | "allScroll" | "zoomIn" | "zoomOut",
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
  flexGrow?: Binary
}

type FlexShrink = {
  flexShrink?: Binary
}

type FlexWrap = {
  flexWrap?: "wrap" | "nowrap" | "wrapReverse"
}

type Hover = Shadow & {
  background?: string,
  color?: string,
  scale?: "sm" | "md" | "lg",
  underline?: boolean,
  visible?: boolean,
}

type GroupHover  = {
  groupHover?: boolean,
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
  break?: string,
  default?: string
}

type Width = {
  width?: string
}

type MaxWidth = {
  maxWidth?: string,
}

type MinWidth = {
  minWidth?: string,
}

type Gap = {
  gap?: string,
}

type ColumnGap = {
  columnGap?: string,
}

type RowGap = {
  rowGap?: string,
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
  break?: string,
  default?: string
}

type Position = {
  position?: "relative" | "absolute" | "fixed" | "sticky" | "static",
}

type Top = {
  top?: Sizes | {value: string, inset: boolean},
}

type Right = {
  right?: Sizes | {value: string, inset: boolean},
}

type Bottom = {
  bottom?: Sizes | {value: string, inset: boolean},
}

type Left = {
  left?: Sizes | {value: string, inset: boolean},
}

type Shadow = {
  shadow?: "none" | "deep" | "deeper" | "deepest",
}

type Space = "spaceBetween" | "spaceAround" | "spaceEvenly"

type TextAlign = {
  textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "justifyAll" | "matchParent",
}

type OverflowTypes = "scroll" | "visible" | "hidden" | "auto"
type Overflow = {
overflowX?: OverflowTypes,
overflowY?: OverflowTypes,
overflow?: OverflowTypes
}

type TruncateType = None | 1 | 2 | 3 | 4 | 5
type Truncate = {
  truncate?: TruncateType
}

type VerticalAlign =  {
  verticalAlign?: "baseline" | "super" | "top" | "middle" | "bottom" | "sub" | "text-top" | "text-bottom"
}

type ZIndexType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'max'
type ZIndexResponsiveType = {[key: string]: ZIndexType}
type ZIndex = {
  zIndex?: ZIndexType,
} | ZIndexResponsiveType

type Height = {
  height?: string
}

type MaxHeight = {
  maxHeight?: string
}

type MinHeight = {
  minHeight?: string
}

// keep this as the last type definition
export type GlobalProps = AlignContent & AlignItems & AlignSelf &
  BorderRadius & Cursor & Dark & Display & DisplaySizes & Flex & FlexDirection &
  FlexGrow & FlexShrink & FlexWrap & JustifyContent & JustifySelf &
  LineHeight & Margin & Width & MinWidth & MaxWidth & Gap & ColumnGap & RowGap & NumberSpacing & Order & Overflow & Padding &
  Position & Shadow & TextAlign & Truncate & VerticalAlign & ZIndex & { hover?: string } & Top & Right & Bottom & Left & Height & MaxHeight & MinHeight;

const getResponsivePropClasses = (prop: {[key: string]: string}, classPrefix: string) => {
  const keys: string[] = Object.keys(prop)
  const screenSizeValues = ["xs", "sm", "md", "lg", "xl"]
  let classResult = ''
  
  // Handle default value separately (generates base class without size prefix)
  if (prop.default !== undefined) {
    const defaultValue: string = typeof(prop.default) === 'string' ? camelToSnakeCase(prop.default) : prop.default
    classResult += `${classPrefix}_${defaultValue} `
  }
  
  // Handle responsive sizes (generates classes with size prefix)
  keys.forEach((key) => {
    if (screenSizeValues.includes(key)) {
      const propValue: string = typeof(prop[key]) === 'string' ? camelToSnakeCase(prop[key]) : prop[key]
      classResult += `${classPrefix}_${key}_${propValue} `
    }
  })
  
  return classResult.trim()
}

//reusable function for top, bottom, right and left props
const getPositioningPropsClasses = (position: string, value: Sizes | {value: string, inset: boolean} ) => {
  let css = "";
  if (typeof value === 'string') {
    css += `${position}_${value}`;
  } else if (typeof value === 'object' && value.inset) {
    css += `${position}_${value.value}_inset`;
  } else if (typeof value === 'object') {
    css += `${position}_${value.value}`;
  }
  return css;
};

const filterClassName = (value: string): string => {
  if (value.includes("%")) {
    return value.replace("%", "_percent");
  } else {
    return value;
  }
};

// Prop categories
const PROP_CATEGORIES: {[key:string]: (props: {[key: string]: any}) => string} = {

  groupHoverProps: ({ groupHover }: GroupHover ) => groupHover ? 'group_hover ' : '',
  hoverProps: ({ hover }: { hover?: Hover }) => {
      let css = '';
      if (!hover) return css;
      css += hover.shadow ? `hover_shadow_${hover.shadow} ` : '';
      css += hover.background ? `hover_background-${hover.background } ` : '';
      css += hover.underline ? `hover_underline ` : '';
      css += hover.scale ? `hover_scale_${hover.scale} ` : '';
      css += hover.color ? `hover_color-${hover.color } ` : '';
      css += hover.visible ? `hover_visible_true` : '';
      return css;
  },

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
    const spacingProps = {
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
    };

    const screenSizeValues = ["xs", "sm", "md", "lg", "xl"]

    function handleObjectValue(properties: Margin | Padding, prefix: string) {
      let classResult = '';

      const breakValue = properties.break || "on";
      const defaultValue = properties.default || null;

      Object.entries(properties).forEach(([key, value]) => {
        if (screenSizeValues.includes(key)) {
          classResult += `break_${breakValue}_${key}:${prefix}_${value} `;
        }
      });

      if (defaultValue) {
        classResult += `${prefix}_${defaultValue} `;
      }

      return classResult;
    }

    function getPrefix(key: string) {
      const prefixes: Record<string, string> = {
        marginRight: 'mr',
        marginLeft: 'ml',
        marginTop: 'mt',
        marginBottom: 'mb',
        marginX: 'mx',
        marginY: 'my',
        margin: 'm',
        paddingRight: 'pr',
        paddingLeft: 'pl',
        paddingTop: 'pt',
        paddingBottom: 'pb',
        paddingX: 'px',
        paddingY: 'py',
        padding: 'p',
      };

      return prefixes[key];
    }

    Object.entries(spacingProps).forEach(([key, value]) => {
      if (value) {
        if (typeof value === 'object') {
          css += handleObjectValue(value, getPrefix(key));
        } else {
          const prefix = getPrefix(key);
          css += `${prefix}_${value} `;
        }
      }
    });
    return css.trim();
  },
  borderRadiusProps: ({ borderRadius }: BorderRadius) => {
    let css = ''
    css += borderRadius ? `border_radius_${borderRadius} ` : ''
    return css
  },
  overflowProps: ({ overflow, overflowX, overflowY }: Overflow) => {
    let css = ''
    css += overflow ? `overflow_${overflow}` : ''
    css += overflowX ? `overflow_x_${overflowX}` : ''
    css += overflowY ? `overflow_y_${overflowY}` : ''
    return css
  },
  truncateProps: ({ truncate }: Truncate) => {
    if (typeof truncate === 'object') {
      return ''
    } else {
      return truncate ? `truncate_${truncate}` : ''
    }
  },
  darkProps: ({ dark }: Dark) => dark ? 'dark' : '',
  numberSpacingProps: ({ numberSpacing }: NumberSpacing) => {
    let css = ''
    css += numberSpacing ? `ns_${numberSpacing} ` : ''
    return css
  },
  widthProps: ({ width }: Width) => {
    let css = ''
    css += width ? `width_${filterClassName(width)} ` : ''
    return css.trimEnd()
  },
  minWidthProps: ({ minWidth }: MinWidth) => {
    let css = ''
    css += minWidth ? `min_width_${filterClassName(minWidth)} ` : ''
    return css.trimEnd()
  },
  maxWidthProps: ({ maxWidth }: MaxWidth) => {
    let css = ''
    css += maxWidth ? `max_width_${filterClassName(maxWidth)} ` : ''
    return css.trimEnd()
  },
  gapProps: ({ gap }: Gap) => {
    if (typeof gap === 'object') {
      return getResponsivePropClasses(gap, 'gap')
    } else {
      return gap ? `gap_${gap}` : ''
    }
  },
  columnGapProps: ({ columnGap }: ColumnGap) => {
    if (typeof columnGap === 'object') {
      return getResponsivePropClasses(columnGap, 'column_gap')
    } else {
      return columnGap ? `column_gap_${columnGap}` : ''
    }
  },
  rowGapProps: ({ rowGap }: RowGap) => {
    if (typeof rowGap === 'object') {
      return getResponsivePropClasses(rowGap, 'row_gap')
    } else {
      return rowGap ? `row_gap_${rowGap}` : ''
    }
  },
  minHeightProps: ({ minHeight }: MinHeight) => {
    const heightValues = ["auto", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"]
    if (heightValues.includes(minHeight)) {
      let css = ''
      css += minHeight ? `min_height_${filterClassName(minHeight)} ` : ''
      return css.trimEnd()
    }
  },
  maxHeightProps: ({ maxHeight }: MaxHeight) => {
    const heightValues = ["auto", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"]
    if (heightValues.includes(maxHeight)) {
      let css = ''
      css += maxHeight ? `max_height_${filterClassName(maxHeight)} ` : ''
      return css.trimEnd()
    }
  },
  heightProps: ({ height }: Height) => {
    const heightValues = ["auto", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"]
    if (heightValues.includes(height)) {
      let css = ''
      css += height ? `height_${filterClassName(height)} ` : ''
      return css.trimEnd()
    }
  },
  zIndexProps: (zIndex: ZIndex) => {
    let css = ''
    Object.entries(zIndex).forEach((zIndexEntry) => {
      if (zIndexEntry[0] == "zIndex") {
        if (typeof zIndexEntry[1] == "number") {
          css += `z_index_${zIndexEntry[1]} `
        } else if (typeof zIndexEntry[1] == "object") {
          const responsiveObj: {[key: string]: string} = {}
          Object.entries(zIndexEntry[1]).forEach(([key, value]) => {
            responsiveObj[key] = value.toString()
          })
          css += getResponsivePropClasses(responsiveObj, 'z_index')
        } else if (zIndexEntry[1] === 'max') {
          css += `z_index_max `
        }
      }
    })
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
          const responsiveObj: {[key: string]: string} = {}
          Object.entries(displayEntry[1]).forEach(([key, value]) => {
            responsiveObj[key] = typeof value === 'string' ? value : value.toString()
          })
          css += getResponsivePropClasses(responsiveObj, 'display')
        } else {
          ' '
        }
      }
    })
    return css
  },
  cursorProps: ({ cursor }: Cursor) => {
    let css = ''
    css += cursor ? `cursor_${camelToSnakeCase(cursor)}` : ''
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
    } else if (BitValues.includes(flexGrow)) {
      return `flex_grow_${flexGrow}`
    } else {
      return ''
    }
  },
  flexShrinkProps: ({ flexShrink }: FlexShrink) => {
    if (typeof flexShrink == 'object') {
      return getResponsivePropClasses(flexShrink, 'flex_shrink')
    } else if (BitValues.includes(flexShrink)) {
      return `flex_shrink_${flexShrink}`
    } else {
      return ''
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
  },
  positionProps: ({ position }: Position) => {
    let css = ''
    css += position && position !== 'static' ? `position_${position}` : ''
    return css
  },


  topProps: ({top}) => getPositioningPropsClasses('top', top),

  rightProps: ({right}) => getPositioningPropsClasses('right', right),

  bottomProps:({bottom}) =>  getPositioningPropsClasses('bottom', bottom),

  leftProps: ({left}) => getPositioningPropsClasses('left', left),


  textAlignProps: ({ textAlign }: TextAlign) => {
    if (typeof textAlign === 'object') {
      return getResponsivePropClasses(textAlign, 'text_align')
    } else {
      return textAlign ? `text_align_${textAlign} ` : ''
    }
  },
  verticalAlignProps: ({ verticalAlign }: VerticalAlign) => {
    if (typeof verticalAlign === 'object') {
      return getResponsivePropClasses(verticalAlign, 'vertical_align')
    } else {
      return verticalAlign ? `vertical_align_${verticalAlign} ` : ''
    }
  },

}

const PROP_INLINE_CATEGORIES: {[key:string]: (props: {[key: string]: any}) => {[key: string]: any}} = {
  heightProps: ({ height }: Height) => {
    return height ? { height } : {};
  },

  maxHeightProps: ({ maxHeight }: MaxHeight) => {
    return maxHeight ? { maxHeight } : {};
  },

  minHeightProps: ({ minHeight }: MinHeight) => {
    return minHeight ? { minHeight } : {};
  },
}

type DefaultProps = {[key: string]: string} | Record<string, unknown>

export const globalProps = (props: GlobalProps, defaultProps: DefaultProps = {}): string => {
  const allProps = { ...props, ...defaultProps }
  return Object.keys(PROP_CATEGORIES).map((key) => {
    return PROP_CATEGORIES[key](allProps)
  }).filter((value) => value?.length > 0).join(" ")
}

// New function for inline styles
export const globalInlineProps = (props: GlobalProps): React.CSSProperties => {
  const styles = Object.keys(PROP_INLINE_CATEGORIES).reduce((acc, key) => {
    const result = PROP_INLINE_CATEGORIES[key](props);
    return { ...acc, ...(typeof result === 'object' ? result : {}) }; // Ensure result is an object before spreading
  }, {});

  return styles; // Return the styles object directly
}


export const deprecatedProps = (): void => {
  // if (process.env.NODE_ENV === 'development') {
  //   /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
  //   props.forEach((prop) => {
  //     console.warn(`${kit} Kit: The prop '${prop}' is deprecated and will be removed in a future release!`)
  //   })
  // }
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
    'enableDrag',
    'requiredIndicator',
  ]
  return omit(props, notSafeProps)
}
