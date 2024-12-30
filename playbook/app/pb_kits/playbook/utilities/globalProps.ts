import { omit } from 'lodash'
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

type Gap = {
  gap?: "space_xxs" | "space_xs" | "space_sm" | "space_md" | "space_lg" | "space_xl" | "none"
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

export type GlobalProps = AlignContent & AlignItems & AlignSelf &
  BorderRadius & Cursor & Dark & Display & DisplaySizes & Flex & FlexDirection &
  FlexGrow & FlexShrink & FlexWrap & JustifyContent & JustifySelf &
  LineHeight & Margin & Padding & Shadow & { hover?: string } & Gap;

const getResponsivePropClasses = (prop: { [key: string]: string }, classPrefix: string) => {
  const keys: string[] = Object.keys(prop)
  return keys.map((size: Sizes) => {
    const propValue: string = typeof prop[size] === 'string' ? camelToSnakeCase(prop[size]) : prop[size]
    return `${classPrefix}_${size}_${propValue}`
  }).join(" ")
}

const PROP_CATEGORIES: { [key: string]: (props: { [key: string]: any }) => string } = {
  gapProps: ({ gap }: Gap) => {
    if (typeof gap === 'object') {
      return getResponsivePropClasses(gap, 'gap_size')
    } else {
      return gap ? `gap_size_${gap}` : ''
    }
  },
}

export const globalProps = (props: GlobalProps, defaultProps: { [key: string]: string } = {}): string => {
  const allProps = { ...props, ...defaultProps }
  return Object.keys(PROP_CATEGORIES).map((key) => {
    return PROP_CATEGORIES[key](allProps)
  }).filter((value) => value?.length > 0).join(" ")
}
