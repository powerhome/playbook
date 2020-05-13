/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Icon, Title } from '../'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type SelectableIconProps = {
  aria?: Object,
  checked?: Boolean,
  className?: String,
  disabled?: Boolean,
  dark?: Boolean,
  data?: Object,
  icon: String,
  inputId: String,
  multi?: Boolean,
  name: String,
  text: String,
  value?: String
}

const SelectableIcon = ({
  aria = {},
  className,
  checked = false,
  dark = false,
  data = {},
  disabled = false,
  icon,
  inputId,
  multi = true,
  name,
  text,
  value,
  ...props
}: SelectableIconProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const css = buildCss({
    'pb_selectable_icon_kit': true,
    'checked': checked,
    'dark': dark,
    'disabled': disabled,
    'enabled': !disabled,
  })

  const inputType = multi === false ? 'radio' : 'checkbox'

  const inputIdPresent = inputId !== null ? inputId : name

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(css, className)}
    >
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
    </div>
  )
}

export default SelectableIcon
