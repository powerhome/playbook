import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps'
import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps
} from '../utilities/props'
import Icon from '../pb_icon/_icon'
import Title from '../pb_title/_title'
import { GenericObject } from '../types'

type SelectableIconProps = {
  aria?: {[key: string]: string},
  checked?: boolean,
  className?: string,
  customIcon?: {[key: string] :SVGElement},
  dark?: boolean,
  disabled?: boolean,
  data?: GenericObject,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  icon: string,
  inputId: string,
  inputs: string,
  multi?: boolean,
  name: string,
  text: string,
  value?: string
}

const SelectableIcon = ({
  aria = {},
  className,
  checked = false,
  customIcon,
  dark = false,
  data = {},
  disabled = false,
  htmlOptions = {},
  icon,
  inputId,
  inputs = 'enabled',
  multi = true,
  name,
  text,
  value,
  ...props
}: SelectableIconProps): React.ReactElement => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const classes = classnames(
    buildCss('pb_selectable_icon_kit', {
      checked: checked,
      dark: dark,
      disabled: disabled,
      enabled: !disabled,
    }),
    globalProps(props),
    dark ? 'dark' : '',
    className
  )

  const inputType = multi === false ? 'radio' : 'checkbox'
  const inputIdPresent = inputId !== null ? inputId : name

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
    >
      {inputs === 'disabled' && (
        <>
          <Icon
              customIcon={customIcon}
              dark={dark}
              icon={icon}
              size="2x"
          />
          <Title
              dark={dark}
              size={4}
              tag="h4"
              text={text}
          />
        </>
      )}

      {inputs === 'enabled' && (
        <>
          <input
              {...props}
              checked={checked}
              disabled={disabled}
              id={inputIdPresent}
              name={name}
              type={inputType}
              value={value}
          />
          <label htmlFor={inputIdPresent}>
            <Icon
                customIcon={customIcon}
                dark={dark}
                icon={icon}
                size="2x"
            />
            <Title
                dark={dark}
                size={4}
                tag="h4"
                text={text}
            />
          </label>
        </>
      )}
    </div>
  )
}

export default SelectableIcon
