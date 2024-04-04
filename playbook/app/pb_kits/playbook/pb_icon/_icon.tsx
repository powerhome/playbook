import React, { ReactSVGElement } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { isValidEmoji } from '../utilities/validEmojiChecker'

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

const Icon = (props: IconProps) => {
  const {
    aria = {},
    border = false,
    className,
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

  let iconElement: ReactSVGElement | null = typeof(icon) === "object" ? icon : null

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
      window.PB_ICONS ? window.PB_ICONS[icon as string] : null

    if (PowerIcon) {
      iconElement = <PowerIcon /> as ReactSVGElement
    } else {
      faClasses[`fa-${icon}`] = icon as string
    }
  }

  const classes = classnames(
    flipMap[flip],
    (!iconElement && !customIcon) ? 'pb_icon_kit' : '',
    (iconElement || customIcon) ? 'pb_custom_icon' : fontStyle,
    iconElement ? 'svg-inline--fa' : '',
    faClasses,
    globalProps(props),
    className
  )

  const classesEmoji = classnames(
    'pb_icon_kit_emoji',
    globalProps(props),
    className
  )

  aria.label ? null : aria.label = `${icon} icon`
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
    else if (isValidEmoji(icon as string))
      return (
        <>
          <span
              {...dataProps}
              {...htmlProps}
              className={classesEmoji}
              id={id}
          >
            {icon}
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
