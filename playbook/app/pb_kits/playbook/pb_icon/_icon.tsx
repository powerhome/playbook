import React, { ReactSVGElement } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { isValidEmoji } from '../utilities/validEmojiChecker'
import aliasesJson from './icon_aliases.json'

export type IconSizes = "lg"
| "xs"
| "sm"
| "1x"
| "2x"
| "3x"
| "4x"
| "5x"
| "6x"
| "7x"
| "8x"
| "9x"
| "10x"
| ""

type IconProps = {
  aria?: {[key: string]: string},
  border?: string,
  className?: string,
  color?: string,
  customIcon?: {[key: string] :SVGElement},
  data?: {[key: string]: string},
  fixedWidth?: boolean,
  flip?: "horizontal" | "vertical" | "both" | "none",
  icon: string | ReactSVGElement,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  inverse?: boolean,
  listItem?: boolean,
  pull?: "left" | "right" | "none",
  pulse?: boolean,
  rotation?: 90 | 180 | 270,
  size?: IconSizes,
  fontStyle?: 'far' | 'fas' | 'fab' | 'fak',
  spin?: boolean,
} & GlobalProps

type AliasType = string | string[];

interface Aliases {
  [key: string]: AliasType;
}

interface AliasesJson {
  aliases: Aliases;
}

const aliases: AliasesJson = aliasesJson;


const flipMap = {
  horizontal: 'fa-flip-horizontal',
  vertical: 'fa-flip-vertical',
  both: 'fa-flip-horizontal fa-flip-vertical',
  none: ""
}

declare global {
  // eslint-disable-next-line no-var
  var PB_ICONS: {[key: string]: React.FunctionComponent<any>}
}

// Resolve alias function
const resolveAlias = (icon: string): string => {
  const alias = aliases.aliases[icon];

  if (alias) {
    if (Array.isArray(alias)) {
      return alias[0];
    } else {
      return alias;
    }
  }

  return icon;
};


const Icon = (props: IconProps) => {
  const {
    aria = {},
    border = false,
    className,
    color,
    customIcon,
    data = {},
    fixedWidth = true,
    flip = "none",
    htmlOptions = {},
    icon = "",
    id,
    inverse = false,
    listItem = false,
    pull,
    pulse = false,
    rotation,
    size,
    fontStyle = 'far',
    spin = false,
  } = props

  const resolvedIcon = resolveAlias(icon as string)
  let iconElement: ReactSVGElement | null = typeof(resolvedIcon) === "object" ? resolvedIcon : null

  const faClasses = {
    'fa-border': border,
    'fa-fw': fixedWidth,
    'fa-inverse': inverse,
    'fa-li': listItem,
    'fa-pulse': pulse,
    'fa-spin': spin,
    [`fa-${size}`]: size,
    [`fa-pull-${pull}`]: pull,
    [`fa-rotate-${rotation}`]: rotation,
  }

  if (!customIcon && !iconElement) {
    const PowerIcon: React.FunctionComponent<any> | undefined =
      window.PB_ICONS ? window.PB_ICONS[resolvedIcon as string] : null

    if (PowerIcon) {
      iconElement = <PowerIcon /> as ReactSVGElement
    } else {
      faClasses[`fa-${resolvedIcon}`] = resolvedIcon as string
    }
  }

  const classes = classnames(
    flipMap[flip],
    (!iconElement && !customIcon) ? 'pb_icon_kit' : '',
    (iconElement || customIcon) ? 'pb_custom_icon' : fontStyle,
    iconElement ? 'svg-inline--fa' : '',
    faClasses,
    color ? `color_${color}` : '',
    globalProps(props),
    className
  )

  const classesEmoji = classnames(
    'pb_icon_kit_emoji',
    globalProps(props),
    className
  )

  aria.label ? null : aria.label = `${resolvedIcon} icon`
  const ariaProps: {[key: string]: any} = buildAriaProps(aria)
  const dataProps: {[key: string]: any} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  // Add a conditional here to show only the SVG if custom
  const displaySVG = (customIcon: any) => {
    if (iconElement || customIcon)
      return (
        <>
          {
            React.cloneElement(iconElement || customIcon, {
              ...dataProps,
              ...htmlProps,
              className: classes,
              id,
              width: 'auto',
              height: 'auto',
            })
          }
        </>
      )
    else if (isValidEmoji(resolvedIcon as string))
      return (
        <>
          <span
              {...dataProps}
              {...htmlProps}
              className={classesEmoji}
              id={id}
          >
            {resolvedIcon}
          </span>
        </>
      )
    else
      return (
        <>
          <i
              {...dataProps}
              {...htmlProps}
              className={classes}
              id={id}
          />
          <span
              {...ariaProps}
              hidden
          />
        </>
      )
  }

  return (
    <>
      {displaySVG(customIcon)}
    </>
  )
}

export default Icon
