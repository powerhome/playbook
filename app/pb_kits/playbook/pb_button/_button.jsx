/* @flow */

import React from 'react'
import classnames from 'classnames'

type EventHandler = (SyntheticInputEvent<HTMLInputElement>) => void
type ButtonPropTypes = {
  aria?: {
    label: String,
  },
  children?: Array<React.ReactChild>,
  className?: String | Array<String>,
  dark: Boolean,
  disabled?: Boolean,
  fixedWidth?: Boolean,
  fullWidth?: Boolean,
  icon?: String,
  id?: String,
  link?: String,
  loading?: Boolean,
  newWindow?: Boolean,
  onClick?: EventHandler,
  size: 'large' | 'medium' | 'small',
  text?: String,
  type: 'inline' | null,
  htmlType: String | 'button',
  value?: String | null,
  variant: 'primary' | 'secondary' | 'link',
  wrapperClass: String,
}

const buttonClassName = (props: ButtonPropTypes) => {
  const {
    dark = false,
    disabled = false,
    fullWidth = false,
    loading = false,
    size = null,
    type = 'inline',
    variant = 'primary',
  } = props

  let className = 'pb_button_kit'

  className += `${variant !== null ? `_${variant}` : ''}`
  className += `${type !== null ? `_${type}` : ''}`
  className += `${size !== null ? `_${size}` : ''}`
  className += `${dark === true ? '_dark' : ''}`
  className += `${fullWidth ? '_block' : ''}`
  className += disabled ? '_disabled' : '_enabled'
  className += loading ? '_loading' : ''

  return className
}

const buttonAriaProps = (props: ButtonPropTypes) => {
  const { aria } = props
  if (typeof aria !== 'object') return {}
  const { label } = aria

  const ariaProps = {}

  if (label !== null) ariaProps['aria-label'] = label

  return ariaProps
}

const Button = (props: ButtonPropTypes) => {
  const {
    children,
    className,
    icon = null,
    id,
    loading = false,
    onClick = () => {},
    link = null,
    newWindow = false,
    text,
    htmlType = 'button',
    value,
  } = props

  const buttonAria = buttonAriaProps(props)
  const css = classnames(buttonClassName(props), className)
  const loadingIcon = (
    <i className='pb_icon_kit far fa-spinner fa-fw fa-pulse loading-icon' />
  )

  const content = (
    <span className='pb_button_content'>
      <If condition={icon !== null}>
        <i className={`pb_icon_kit far fa-${icon} fa-fw`} />
      </If>
      <span>{text || children}</span>
    </span>
  )

  return (
    <If condition={link !== null}>
      <a
          {...buttonAria}
          className={css}
          href={link}
          id={id}
          target={newWindow ? '_blank' : null}
      >
        <If condition={loading}>{loadingIcon}</If>
        {content}
      </a>
      <Else />
      <button
          {...buttonAria}
          className={css}
          id={id}
          onClick={onClick}
          type={htmlType}
          value={value}
      >
        <If condition={loading}>{loadingIcon}</If>
        {content}
      </button>
    </If>
  )
}

export default Button
