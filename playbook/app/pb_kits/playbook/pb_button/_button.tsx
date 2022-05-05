import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'

import Icon from '../pb_icon/_icon'

type EventHandler = (React.MouseEventHandler<HTMLElement>)

type ButtonPropTypes = {
  aria?: {[key: string]: string},
  children?: Array<React.ReactChild>,
  className?: string | Array<string>,
  data?: object,
  disabled?: boolean,
  fixedWidth?: boolean,
  form?: string,
  fullWidth?: boolean,
  icon?: string,
  id?: string,
  link?: string,
  loading?: boolean,
  newWindow?: boolean,
  onClick?: EventHandler,
  size?: 'sm' | 'md' | 'lg',
  text?: string,
  type: 'inline' | null,
  htmlType: 'submit' | 'reset' | 'button' | undefined,
  value?: string | null,
  variant: 'primary' | 'secondary' | 'link',
  wrapperClass: string,
} & GlobalProps

const buttonClassName = (props: ButtonPropTypes) => {
  const {
    disabled = false,
    fullWidth = false,
    loading = false,
    type = 'inline',
    variant = 'primary',
    size = null,
  } = props

  let className = 'pb_button_kit'

  className += `${variant !== null ? `_${variant}` : ''}`
  className += `${type !== null ? `_${type}` : ''}`
  className += `${fullWidth ? '_block' : ''}`
  className += disabled ? '_disabled' : '_enabled'
  className += loading ? '_loading' : ''
  className += `${size !== null ? ` size_${size}` : ''}`

  return className
}

const Button = (props: ButtonPropTypes) => {
  const {
    aria = {},
    children,
    className,
    data = {},
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
    form = null
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
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
      {icon && (
        <i className={`pb_icon_kit far fa-${icon} fa-fw`} />
      )}
      <span>{text || children}</span>
    </span>
  )

  const ifLoading = () => {
    if (loading){
      return(
        <>
          {loadingIcon}
        </>
      )
    } else {
      return (
        content
      )
    }
  }

  const displayButton = () => {
    if (link)
      return (
        <a
            {...ariaProps}
            {...dataProps}
            className={css}
            href={link}
            id={id}
            rel="noreferrer"
            role="link"
            target={newWindow ? '_blank' : null}
        >
          {ifLoading()}
        </a>
      )
    else
      return (
        <button
            {...ariaProps}
            {...dataProps}
            className={css}
            disabled={disabled}
            form={form}
            id={id}
            onClick={onClick}
            role="button"
            type={htmlType}
            value={value}
        >
          {ifLoading()}
        </button>
      )
  }

  return (
    <>
      {displayButton()}
    </>
  )
}

export default Button
