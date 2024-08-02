import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { isValidEmoji } from '../utilities/validEmojiChecker'
import { buttonVariants, buttonSizes, buttonDisabled, buttonBlock, buttonLoading } from './button.css';
import { defaultButtonTheme } from './buttonTheme.css';

import Icon from '../pb_icon/_icon'
import Caption from "../pb_caption/_caption"
import Flex from "../pb_flex/_flex"

type EventHandler = (React.MouseEventHandler<HTMLElement>)

type ButtonPropTypes = {
  aria?: { [key: string]: string },
  children?: React.ReactChild[] | React.ReactChild,
  className?: string | string[],
  count?: number,
  data?: { [key: string]: string },
  disabled?: boolean,
  fixedWidth?: boolean,
  form?: string,
  fullWidth?: boolean,
  highlight?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  icon?: string,
  iconRight?: boolean,
  id?: string,
  link?: string,
  loading?: boolean,
  newWindow?: boolean,
  onClick?: EventHandler,
  tabIndex?: number,
  size?: 'sm' | 'md' | 'lg',
  target?: string,
  text?: string,
  type?: 'inline' | null,
  htmlType?: 'submit' | 'reset' | 'button' | undefined,
  value?: string | null,
  variant?: 'primary' | 'secondary' | 'link'| 'reaction',
  wrapperClass?: string,
} & GlobalProps

const buttonClassName = (props: ButtonPropTypes) => {
  const {
    disabled = false,
    fullWidth = false,
    highlight,
    icon,
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
  className += `${variant === 'reaction' && !isValidEmoji(icon) ? ` reaction_default` : ''}`
  className += `${variant === 'reaction' && highlight ? ` active` : ''}`

  return className
}

const Button = (props: ButtonPropTypes): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    count,
    data = {},
    disabled,
    form = null,
    fullWidth = false,
    htmlOptions = {},
    icon = null,
    iconRight = false,
    id,
    loading = false,
    onClick,
    tabIndex,
    link = null,
    newWindow = false,
    target = '',
    text,
    htmlType = 'button',
    value,
    variant,
    size = null
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const buttonClass = [
    defaultButtonTheme,
    buttonVariants[variant],
    buttonSizes[size],
    disabled && buttonDisabled,
    fullWidth && buttonBlock,
    loading && buttonLoading,
  ].filter(Boolean).join(' ');

  const css = classnames(
    buttonClass,
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
      {icon && !iconRight && (
        <i className={`pb_icon_kit far fa-${icon} fa-fw button_with_icon`} />
      )}
      <span>{text || children}</span>
      {icon && iconRight && (
        <i className={`pb_icon_kit far fa-${icon} fa-fw button_with_icon_right`} />
      )}
    </span>
  )

  const ifLoading = () => {
    if (loading) {
      return (
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

  const getTargetAttribute = () => {
    if (target && link) {
      return target
    } else if (newWindow) {
      return '_blank'
    }

    return null
  }

  const displayButton = () => {
    if (link) {
      return (
        <a
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={css}
            href={link}
            id={id}
            rel={target !== "child" ? "noreferrer" : null}
            role="link"
            tabIndex={tabIndex}
            target={getTargetAttribute()}
        >
          {ifLoading()}
        </a>
      );
    } else if (variant === "reaction") {
      return (
        <button
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={css}
            disabled={disabled}
            form={form}
            id={id}
            onClick={onClick}
            role="button"
            tabIndex={tabIndex}
            type={htmlType}
            value={value}
        >
          {icon && isValidEmoji(icon) && (
            <Flex align='center'>
              <Icon icon={icon} />
              {count && (
                <Caption 
                    paddingLeft="xxs"
                    size="xs"
                >
                  {count}
                </Caption>
              )}
            </Flex>
           )
          }
          {
            !isValidEmoji(icon) && (
              <Icon icon={icon ? icon : "face-smile-plus"} />
            )
          }

        
        </button>
      );
    } else {
      return (
        <button
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={css}
            disabled={disabled}
            form={form}
            id={id}
            onClick={onClick}
            role="button"
            tabIndex={tabIndex}
            type={htmlType}
            value={value}
        >
          {ifLoading()}
        </button>
      );
    }
  }

  return (
    <>
      {displayButton()}
    </>
  )
}

export default Button
