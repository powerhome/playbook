import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps, noop } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Button from '../pb_button/_button'
import Icon from '../pb_icon/_icon'

type CircleIconButtonProps = {
  aria?: { [key: string]: string },
  className?: string,
  dark?: boolean,
  data?: { [key: string]: string },
  disabled?: boolean,
  icon: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  link?: string,
  loading?: boolean,
  onClick?: React.MouseEventHandler<HTMLElement>,
  newWindow?: boolean,
  type?: 'button' | 'submit' | 'reset' | undefined,
  target?: string
  variant?: 'primary' | 'secondary' | 'link',
  size?: 'default' | 'sm',
}

const CircleIconButton = (props: CircleIconButtonProps): React.ReactElement => {
  const {
    aria = {},
    className,
    dark,
    data = {},
    disabled,
    htmlOptions = {},
    icon,
    id,
    loading = false,
    onClick = noop,
    type,
    target,
    link,
    newWindow,
    variant,
    size = 'default',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const sizeClass = size === 'sm' ? 'size_small' : ''
  const classes = classnames(
    buildCss('pb_circle_icon_button_kit'),
    sizeClass,
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <Button
          aria={aria}
          dark={dark}
          disabled={disabled}
          htmlType={type}
          link={link}
          loading={loading}
          newWindow={newWindow}
          onClick={onClick}
          target={target}
          text={null}
          variant={variant}
      >
        <Icon
            fixedWidth
            htmlOptions={{'aria-hidden': true}}
            icon={icon}
        />
      </Button>
    </div>
  )
}

export default CircleIconButton
