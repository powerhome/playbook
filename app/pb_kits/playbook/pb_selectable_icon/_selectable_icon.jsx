/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Icon, Title } from '../'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

type SelectableIconProps = {
  aria?: Object,
  checked?: boolean,
  className?: string,
  disabled?: boolean,
  data?: Object,
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
  data = {},
  disabled = false,
  icon,
  inputId,
  inputs = 'enabled',
  multi = true,
  name,
  text,
  value,
  ...props
}: SelectableIconProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(
    buildCss('pb_selectable_icon_kit', {
      checked: checked,
      disabled: disabled,
      enabled: !disabled,
    }),
    globalProps(props),
    className
  )

  const inputType = multi === false ? 'radio' : 'checkbox'

  const inputIdPresent = inputId !== null ? inputId : name

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
    >
      <If condition={inputs === 'disabled'}>
        <>
          <Icon
              icon={icon}
              size="2x"
          />
          <Title
              size={4}
              tag="h4"
              text={text}
          />
        </>
      </If>
      <If condition={inputs === 'enabled'}>
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
                icon={icon}
                size="2x"
            />
            <Title
                size={4}
                tag="h4"
                text={text}
            />
          </label>
        </>
      </If>
    </div>
  )
}

export default SelectableIcon
