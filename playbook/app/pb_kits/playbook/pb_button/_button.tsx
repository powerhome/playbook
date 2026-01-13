import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { isValidEmoji } from '../utilities/validEmojiChecker'
import { getAllIcons } from "../utilities/icons/allicons"

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
  variant?: 'primary' | 'secondary' | 'link'| 'danger' | 'reaction',
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
    text,
    children,
  } = props

  const classNames = ['pb_button_kit']
  const isIconOnly = icon && !text && !children

  if (variant) classNames.push(`pb_button_${variant}`)
  if (type) classNames.push(`pb_button_${type}`)
  if (fullWidth) classNames.push('pb_button_block')
  classNames.push(disabled ? 'pb_button_disabled' : 'pb_button_enabled')
  if (loading) classNames.push('pb_button_loading')
  if (size) classNames.push(`pb_button_size_${size}`)
  if (variant === 'reaction' && icon && !isValidEmoji(icon)) classNames.push('pb_button_reaction_default')
  if (variant === 'reaction' && highlight) classNames.push('pb_button_active')
  if (isIconOnly) classNames.push('pb_button_icon_only')

  return classNames.join(' ')
}
const spinnerIcon = getAllIcons()["spinner"]

const Button = (props: ButtonPropTypes): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    count,
    data = {},
    disabled,
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
    form = null
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const css = classnames(
    buttonClassName(props),
    globalProps(props),
    className
  )
  const loadingIcon = (
    <div className="loading-icon">
      <Icon
          className="svg-inline--fa"
          customIcon={spinnerIcon.icon as unknown as { [key: string]: SVGElement }}
          fixedWidth
          pulse
      />
    </div>
  )

  const content = (
    <span className="pb_button_content">
      {icon && !iconRight && (
        <Icon className='button_with_icon'
            icon={icon}
        />
      )}
      <span>{text || children}</span>
      {icon && iconRight && (
        <Icon className='button_with_icon_right'
            icon={icon}
        />
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
