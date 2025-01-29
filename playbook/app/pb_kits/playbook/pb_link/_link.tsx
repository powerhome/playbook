import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Icon from '../pb_icon/_icon'

type LinkProps = {
  aria?: {[key: string]: string},
  className?: string,
  children?: React.ReactChild[] | React.ReactChild,
  color?: 'default' | 'body' | 'muted' | 'destructive',
  dark?: boolean,
  data?: {[key: string]: string},
  disabled?: boolean,
  href?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void) | ((arg?: Event) => void)},
  icon?: string,
  iconRight?: string,
  id?: string,
  newWindow?: boolean,
  tabIndex?: number,
  tag?: 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  target?: string,
  text?: string,
  underline?: boolean,
} & GlobalProps

const Link = (props: LinkProps): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    color = '',
    data = {},
    disabled = false,
    href= '',
    htmlOptions = {},
    icon = '',
    iconRight = '',
    id = '',
    newWindow = false,
    tabIndex,
    tag = 'a',
    target = '',
    text = '',
    underline = false,
  } = props

  const ariaProps: {[key: string]: string} = buildAriaProps(aria)
  const dataProps: {[key: string]: string} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss('pb_link_kit', color, underline ? 'underline' : '', disabled ? 'disabled' : ''),
    globalProps(props),
    className
  )
  const Tag = tag as keyof JSX.IntrinsicElements

  const getTargetAttribute = () => {
    if (target && icon) {
      return target
    } else if (newWindow) {
      return '_blank'
    }

    return undefined
  }

  const renderContent = () => (
    <>
      {icon && (
        <Icon
            fixedWidth
            icon={icon}
            marginRight="xxs"
            size="xs"
            tabIndex={tabIndex}
            target={getTargetAttribute()}
        />
      )}
      {text || children}
      {iconRight && (
        <Icon
            fixedWidth
            icon={iconRight}
            marginLeft="xxs"
            size="xs"
            tabIndex={tabIndex}
            target={getTargetAttribute()}
        />
      )}
    </>
  )

  const commonProps = {
    ...ariaProps,
    ...dataProps,
    ...htmlProps,
    className: classes,
    id,
  }

  if (tag === 'a') {
    return (
      <a
          {...commonProps}
          href={href}
          tabIndex={tabIndex}
          target={getTargetAttribute()}
      >
        {renderContent()}
      </a>
    )
  } else {
    return (
      <a
          {...commonProps}
          href={href}
          tabIndex={tabIndex}
          target={getTargetAttribute()}
      >
        <Tag>{renderContent()}</Tag>
      </a>
    )
  }

}

export default Link