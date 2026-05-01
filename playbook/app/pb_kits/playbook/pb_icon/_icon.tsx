import React, { ReactSVGElement, useEffect, useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { isValidEmoji } from '../utilities/validEmojiChecker'
import {
  getPlaybookIconClassName,
  loadPlaybookIconSvg,
  supportsPlaybookIcon,
  supportsPlaybookIconFetch,
} from '../utilities/icons/playbookIconResolver'

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
  aria?: { [key: string]: string | boolean }
  border?: string,
  className?: string,
  color?: string,
  customIcon?: {[key: string] :SVGElement},
  data?: {[key: string]: string},
  fixedWidth?: boolean,
  flip?: "horizontal" | "vertical" | "both" | "none",
  icon?: string | ReactSVGElement,
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
  tabIndex?: number,
} & GlobalProps

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

const sizeMap = {
  fa: {
    "lg": "fa-lg",
    "xs": "fa-xs",
    "sm": "fa-sm",
    "1x": "fa-1x",
    "2x": "fa-2x",
    "3x": "fa-3x",
    "4x": "fa-4x",
    "5x": "fa-5x",
    "6x": "fa-6x",
    "7x": "fa-7x",
    "8x": "fa-8x",
    "9x": "fa-9x",
    "10x": "fa-10x",
    "": ""
  },
  svg: {
    "lg": "svg_lg",
    "xs": "svg_xs",
    "sm": "svg_sm",
    "1x": "svg_1x",
    "2x": "svg_2x",
    "3x": "svg_3x",
    "4x": "svg_4x",
    "5x": "svg_5x",
    "6x": "svg_6x",
    "7x": "svg_7x",
    "8x": "svg_8x",
    "9x": "svg_9x",
    "10x": "svg_10x",
    "": ""
  }

}

declare global {
  // eslint-disable-next-line no-var
  var PB_ICONS: {[key: string]: React.FunctionComponent<any>}
}

const svgAttributeMap: {[key: string]: string} = {
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  'fill-rule': 'fillRule',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-width': 'strokeWidth',
  'xmlns:xlink': 'xmlnsXlink',
  'xlink:href': 'xlinkHref',
}

const convertAttributeName = (attributeName: string) => {
  return svgAttributeMap[attributeName] || attributeName.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase())
}

const parseSvgAttributes = (attributeSource: string) => {
  const attributes: {[key: string]: string} = {}
  const attributePattern = /([:@a-zA-Z0-9-]+)="([^"]*)"/g
  let match = attributePattern.exec(attributeSource)

  while (match) {
    attributes[convertAttributeName(match[1])] = match[2]
    match = attributePattern.exec(attributeSource)
  }

  return attributes
}

const normalizeSvgInnerMarkup = (innerMarkup: string, fillColor: string) => {
  return innerMarkup.replace(/<(path)\b([^>]*)fill="[^"]*"/gi, `<$1$2fill="${fillColor}"`)
}

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
    tabIndex,
  } = props

  let iconElement: ReactSVGElement | null = typeof(icon) === "object" ? icon : null
  const iconName = typeof(icon) === "string" ? icon : ""
  const shouldLoadInlinePlaybookIcon = !customIcon && !iconElement && Boolean(iconName) && supportsPlaybookIconFetch(iconName)
  const [inlinePlaybookSvgMarkup, setInlinePlaybookSvgMarkup] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    let isActive = true

    if (!shouldLoadInlinePlaybookIcon) {
      setInlinePlaybookSvgMarkup(undefined)
      return () => {
        isActive = false
      }
    }

    setInlinePlaybookSvgMarkup(undefined)

    loadPlaybookIconSvg(iconName).then((markup) => {
      if (isActive) setInlinePlaybookSvgMarkup(markup)
    })

    return () => {
      isActive = false
    }
  }, [iconName, shouldLoadInlinePlaybookIcon])

  const inlinePlaybookSvgReady = Boolean(inlinePlaybookSvgMarkup)
  const inlinePlaybookSvgFailed = shouldLoadInlinePlaybookIcon && inlinePlaybookSvgMarkup === null
  const legacyPowerIcon = !customIcon && !iconElement && (!shouldLoadInlinePlaybookIcon || inlinePlaybookSvgFailed) && window.PB_ICONS ? window.PB_ICONS[iconName] : null
  const hasClassBasedPlaybookIcon = !inlinePlaybookSvgReady && !legacyPowerIcon && !customIcon && !iconElement && !shouldLoadInlinePlaybookIcon && Boolean(iconName) && supportsPlaybookIcon(iconName)
  const playbookIconClassName = hasClassBasedPlaybookIcon ? getPlaybookIconClassName(iconName) : null

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

  if (!customIcon && !iconElement && !inlinePlaybookSvgReady && !hasClassBasedPlaybookIcon) {
    if (legacyPowerIcon) {
      const LegacyPowerIcon = legacyPowerIcon
      iconElement = <LegacyPowerIcon /> as ReactSVGElement
    } else {
      faClasses[`fa-${icon}`] = icon as string
      }
  }

  const isFA = !iconElement && !customIcon && !inlinePlaybookSvgReady && !hasClassBasedPlaybookIcon && !shouldLoadInlinePlaybookIcon

  let classes = classnames(
    (!iconElement && !customIcon && !inlinePlaybookSvgReady && !hasClassBasedPlaybookIcon) ? 'pb_icon_kit' : '',
    (iconElement || customIcon || inlinePlaybookSvgReady || hasClassBasedPlaybookIcon) ? 'pb_custom_icon' : fontStyle,
    (iconElement || inlinePlaybookSvgReady || hasClassBasedPlaybookIcon) ? 'svg-inline--fa' : '',
    hasClassBasedPlaybookIcon ? 'pb_playbook_icon' : '',
    playbookIconClassName,
    color ? `color_${color}` : '',
    globalProps(props),
    className
  )

  const transformClasses = classnames(
    flip ? flipMap[isFA ? 'fa' : 'svg'][flip] : null,
    pulse ? pulseMap[isFA ? 'fa' : 'svg'] : null,
    rotation ? rotateMap[isFA ? 'fa' : 'svg'][rotation] : null,
    spin ? spinMap[isFA ? 'fa' : 'svg'] : null,
    size ? sizeMap[isFA ? 'fa' : 'svg'][size] : null,
    border ? isFA ? 'fa-border' : 'svg_border' : null,
    fixedWidth ? isFA ? 'fa-fw' : 'svg_fw' : null,
    inverse ? isFA ? 'fa-inverse' : 'svg_inverse' : null,
    listItem ? isFA ? 'fa-li' : 'svg_li' : null,
    pull ? isFA ? `fa-pull-${pull}` : `pull_${pull}` : null,
  )
  classes += ` ${transformClasses}`

  if (isFA) {
    const faClassList = {
      'fa-border': border,
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

  const normalizedAria: { [key: string]: string } = Object.fromEntries(
    Object.entries(aria).map(([key, value]) => [
      key,
      typeof value === "boolean" ? String(value) : value,
    ])
  )

  const ariaProps = buildAriaProps(normalizedAria)
  const dataProps: {[key: string]: any} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  // Add a conditional here to show only the SVG if custom
  const displaySVG = (customIcon: any) => {
    if (inlinePlaybookSvgReady) {
      const svgMatch = inlinePlaybookSvgMarkup?.match(/<svg([^>]*)>([\s\S]*)<\/svg>/i)
      if (!svgMatch) return null

      const [, rawAttributes, innerMarkup] = svgMatch
      const svgAttributes = parseSvgAttributes(rawAttributes)

      return (
        <svg
            {...svgAttributes}
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            color={color || 'currentColor'}
            dangerouslySetInnerHTML={{ __html: normalizeSvgInnerMarkup(innerMarkup.trim(), color || 'currentColor') }}
            height="auto"
            id={id}
            width="auto"
            {...(props.tabIndex !== undefined && { tabIndex })}
        />
      )
    } else if (hasClassBasedPlaybookIcon)
      return (
        <i
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
            {...(props.tabIndex !== undefined && { tabIndex })}
        />
      )
    else if (iconElement || customIcon)
      return (
        <>
          {
            React.cloneElement(iconElement || customIcon, {
              ...ariaProps,
              ...dataProps,
              ...htmlProps,
              className: classes,
              id,
              width: 'auto',
              height: 'auto',
              ...(props.tabIndex !== undefined && { tabIndex }),
            })
          }
        </>
      )
    else if (isValidEmoji(icon as string))
      return (
        <>
          <span
              {...ariaProps}
              {...dataProps}
              {...htmlProps}
              className={classesEmoji}
              id={id}
          >
            {icon}
          </span>
        </>
      )
    else if (shouldLoadInlinePlaybookIcon)
      return null
    else
      return (
        <>
          <i
              {...ariaProps}
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
