/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

import Icon from '../pb_icon/_icon.jsx'

type EventHandler = (SyntheticInputEvent<HTMLInputElement>) => void
type ButtonPropTypes = {
  aria?: {
    label: string,
  },
  children?: array<React.ReactChild>,
  className?: string | array<string>,
  disabled?: boolean,
  fixedWidth?: boolean,
  fullWidth?: boolean,
  icon?: string,
  id?: string,
  link?: string,
  loading?: boolean,
  newWindow?: boolean,
  onClick?: EventHandler,
  size: 'large' | 'medium' | 'small',
  text?: string,
  type: 'inline' | null,
  htmlType: string | 'button',
  value?: string | null,
  variant: 'primary' | 'secondary' | 'link',
  wrapperClass: string,
}

const buttonClassName = (props: ButtonPropTypes) => {
  const {
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
    disabled,
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
  const css = classnames(
    buttonClassName(props),
    globalProps(props),
    className
  )
  const loadingIcon = (
    <div className="loading-icon">
      <Icon
          fixedWidth
          icon="spinner"
          pulse
      />
    </div>
  )

  const content = (
    <span className="pb_button_content">
      <If condition={icon !== null}>
        <i className={`pb_icon_kit far fa-${icon} fa-fw`} />
        {' '}
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
          disabled={disabled}
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
