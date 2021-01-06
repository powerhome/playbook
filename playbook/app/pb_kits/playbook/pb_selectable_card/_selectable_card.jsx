/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { Card, Flex, Icon, Checkbox, Radio, SectionSeparator } from '../'

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
  variant?: string,
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
  variant = "default",
  ...props
}: SelectableCardProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(buildCss('pb_selectable_card_kit',
    { 'checked': checked,
      'disabled': disabled,
      'enabled': !disabled }),
  globalProps(props), className)

  const seperatorClass = "separator " + (checked ? "selected" : "not-selected")

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

  const handleChange = e => {
    console.log(e.target)
    console.log(e.target.checked)
    e.persist()
    onChange(e)
  }

  const Input = multi ? Checkbox : Radio

  if (variant === "displayInput") {
    return (
      <div  className={classes}>
        <input
          {...props}
          checked={checked}
          disabled={disabled}
          id={inputIdPresent}
          name={name}
          onChange={handleChange}
          type={inputType}
          value={value}
      />
        <label
            className={globalProps(props) + globalProps({padding: "none"})}
            htmlFor={inputIdPresent}
        >
        <Flex vertical="center">
          <Flex padding="sm" paddingRight="xs" orientation="column" vertical="center">
            <Input>
              <input
                  type={inputType}
                  onChange={handleChange}
                  className={"displayInput"}
                  checked={checked}
                  name={name}
                  value={value}
              />
            </Input>
          </Flex>
          <div className={seperatorClass}/>
          <Card.Body padding="sm">
            {text || children}
          </Card.Body>
        </Flex>
      {displayIcon()}
      </label>
      </div>
    )
  }

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
