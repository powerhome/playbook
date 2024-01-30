import React, { ReactSVGElement } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { isValidEmoji } from '../utilities/validEmojiChecker'

type IconSizeNames = "lg"
| "xs"
| "sm"

export type IconSizes = IconSizeNames | "1x"
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
  aspectRatio?: string,
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

const iconSizeMap = {
  base: 16,
  xs: .75,
  sm: .875,
  lg: 1.25
}

const getSvgDimensions = (aspectRatio = '1:1', size: string): {width: number, height: number} | null => {
  if (!size) return null
  const aspect = aspectRatio.split(':')

  const scale = size.toLowerCase().includes('x') ?
    parseInt(size.replace(/\x/i, '')) :
    iconSizeMap[size as IconSizeNames]

  return {
    width: (iconSizeMap.base * scale) * parseInt(aspect[0]),
    height: (iconSizeMap.base * scale) * parseInt(aspect[1])
  }
}

const flipMap = {
  fa: {
    horizontal: 'fa-flip-horizontal',
    vertical: 'fa-flip-vertical',
    both: 'fa-flip-horizontal fa-flip-vertical',
    none: ''
  },
  svg: {
    horizontal: 'flip_horizontal',
    vertical: 'flip_vertical',
    both: 'flip_horizontal flip_vertical',
    none: ''
  }
}
const pulseMap = {
  fa: 'fa-pulse',
  svg: 'pulse'
}
const spinMap = {
  fa: 'fa-spin',
  svg: 'spin'
}
const rotateMap = {
  fa: {
    90: 'fa-rotate-90',
    180: 'fa-rotate-180',
    270: 'fa-rotate-270'
  },
  svg: {
    90: 'rotate_90',
    180: 'rotate_180',
    270: 'rotate_270'
  }
}

const Icon = (props: IconProps) => {
  const {
    aria = {},
    aspectRatio,
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
    size = '1x',
    fontStyle = 'far',
    spin = false,
  } = props

  const iconURL = typeof(icon) === 'string' && icon.includes('.svg') ? icon : null
  const iconElement: ReactSVGElement | null = typeof(icon) === "object" ? icon : null

  const isFA = !iconElement && !customIcon && !iconURL
  const svgProps = isFA ? null : {...{fill: 'currentColor'}, ...getSvgDimensions(aspectRatio, size)}

  let classes = classnames(
    'pb_icon_kit',
    isFA ? fontStyle : null,
    globalProps(props),
    className
  )

  const transformClasses = classnames(
    flip ? flipMap[isFA ? 'fa' : 'svg'][flip] : null,
    pulse ? pulseMap[isFA ? 'fa' : 'svg'] : null,
    rotation ? rotateMap[isFA ? 'fa' : 'svg'][rotation] : null,
    spin ? spinMap[isFA ? 'fa' : 'svg'] : null,
  )
  if (transformClasses) classes += ` ${transformClasses}`

  if (isFA) {
    const faClassList = {
      'fa-border': border,
      'fa-fw': (iconElement) ? false : fixedWidth,
      'fa-inverse': inverse,
      'fa-li': listItem,
      [`fa-${size}`]: size,
      [`fa-pull-${pull}`]: pull,
    }
    faClassList[`fa-${icon}`] = icon as string
    classes += ` ${classnames(faClassList)}`
  }

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
              ...svgProps,
              className: classes,
              id,
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
    else if (iconURL)
      return (
        <>
          <img
              {...dataProps}
              {...htmlProps}
              {...svgProps}
              className={classes}
              id={id}
              src={iconURL}
          />
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
