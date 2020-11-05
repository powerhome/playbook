/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Icon } from '../'

import type { InputCallback } from '../types'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  noop,
} from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

type SelectableCardProps = {
  aria?: object,
  checked: boolean,
  children?: array<React.ReactChild>,
  className?: string,
  data: object,
  disabled?: boolean,
  icon?: boolean,
  id?: string,
  inputId?: string,
  multi?: boolean,
  name?: string,
  onChange: InputCallback<HTMLInputElement>,
  text?: string,
  value?: string,
}

const SelectableCard = ({
  aria = {},
  checked = false,
  children,
  className,
  data = {},
  disabled = false,
  icon = false,
  inputId = null,
  multi = true,
  name,
  onChange = noop,
  text,
  value,
  ...props
}: SelectableCardProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(buildCss('pb_selectable_card_kit',
    { 'checked': checked,
      'disabled': disabled,
      'enabled': !disabled }),
  globalProps(props), className)

  const displayIcon = () => {
    if (icon === true) {
      return (
        <div className="pb_selectable_card_circle">
          <Icon
              fixedWidth
              icon="check"
          />
        </div>
      )
    }
  }

  const inputType = multi === false ? 'radio' : 'checkbox'

  const inputIdPresent = inputId !== null ? inputId : name

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
    >
      <input
          {...props}
          checked={checked}
          disabled={disabled}
          id={inputIdPresent}
          name={name}
          onChange={onChange}
          type={inputType}
          value={value}
      />
      <label
          className={globalProps(props)}
          htmlFor={inputIdPresent}
      >
        {text || children}
        {displayIcon()}
      </label>
    </div>
  )
}
export default SelectableCard
