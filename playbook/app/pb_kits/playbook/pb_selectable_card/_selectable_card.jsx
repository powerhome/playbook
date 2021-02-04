/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Card, Checkbox, Flex, Icon, Radio } from '../'

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
  dark?: boolean,
  data: object,
  disabled?: boolean,
  error?: boolean,
  icon?: boolean,
  id?: string,
  inputId?: string,
  multi?: boolean,
  name?: string,
  onChange: InputCallback<HTMLInputElement>,
  text?: string,
  value?: string,
  variant?: string,
}

const SelectableCard = ({
  aria = {},
  checked = false,
  children,
  className,
  dark = false,
  data = {},
  disabled = false,
  error = false,
  icon = false,
  inputId = null,
  multi = true,
  name,
  onChange = noop,
  text,
  value,
  variant = 'default',
  ...props
}: SelectableCardProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(buildCss('pb_selectable_card_kit',
    {
      'checked': checked,
      'disabled': disabled,
      'enabled': !disabled,
    }),
  { error },
  dark ? 'dark' : '',
  className
  )

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

  const inputRef = React.createRef()
  // Delegate clicks to hidden input from visible one
  const handleClick = () => {
    inputRef.current.click()
  }

  const inputType = multi ? 'checkbox' : 'radio'
  const inputIdPresent = inputId !== null ? inputId : name
  const Input = multi ? Checkbox : Radio
  const labelProps = variant === 'displayInput' ? Object.assign(props, { padding: 'none' }) : props

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
          ref={inputRef}
          type={inputType}
          value={value}
      />

      <label
          className={globalProps(labelProps)}
          htmlFor={inputIdPresent}
      >
        <div className="buffer">
          <Choose>
            <When condition={variant === 'displayInput'}>
              <Flex vertical="center">
                <Flex
                    orientation="column"
                    padding="sm"
                    paddingRight="xs"
                    vertical="center"
                >
                  <Input dark={dark}>
                    <input
                        checked={checked}
                        disabled={disabled}
                        onClick={handleClick}
                        type={inputType}
                    />
                  </Input>
                </Flex>
                <div className="separator" />
                <Card.Body
                    dark={dark}
                    padding="sm"
                    status={error ? 'negative' : null}
                >
                  {text || children}
                </Card.Body>
              </Flex>
            </When>
            <Otherwise>
              {text || children}
            </Otherwise>
          </Choose>
          {displayIcon()}
        </div>
      </label>
    </div>
  )
}
export default SelectableCard
