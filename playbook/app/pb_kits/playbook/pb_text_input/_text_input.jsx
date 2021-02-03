/* @flow */
import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { Body, Caption, ProgressSimple } from '../'
import { globalProps } from '../utilities/globalProps.js'

import {
  buildAriaProps,
  buildDataProps,
} from '../utilities/props'

type TextInputProps = {
  aria?: object,
  className: string,
  data?: object,
  dark?: boolean,
  disabled?: boolean,
  error?: string,
  id?: string,
  name: string,
  label: string,
  onChange: (String) => void,
  placeholder: string,
  required?: boolean,
  type: string,
  value: string | number,
  variant?: string,
  children: Node,
}

const TextInput = (
  props: TextInputProps,
  ref: React.ElementRef<"input">
) => {
  const {
    aria = {},
    className,
    data = {},
    dark = false,
    disabled,
    error,
    id,
    name,
    label,
    onChange = () => {},
    placeholder,
    required,
    type = 'text',
    value = '',
    variant = null,
    children = null,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames([
    'pb_text_input_kit',
    error ? 'error' : null,
    globalProps(props),
    className,
  ])

  const passwordStrengthCalculation = (value) => {
    let text = ''
    let colorVariant = ''
    let strength = ''

    if (value.length < 1) {
      text = ''
      colorVariant = null
      strength = 0
    } else if (value.length >= 1 && value.length < 5) {
      text = 'weak'
      colorVariant = 'negative'
      strength = 1
    } else if (value.length >= 5 && value.length < 8) {
      text = 'moderate'
      colorVariant = 'default'
      strength = 2
    } else if (value.length >= 8 && value.length < 12) {
      text = 'strong'
      colorVariant = 'positive'
      strength = 3
    } else if (value.length >= 12) {
      text = 'very strong'
      colorVariant = 'positive'
      strength = 4
    }
    return { colorVariant, text, strength }
  }

  const { colorVariant: passwordColorVariant, text: passwordText, strength: passwordStrength } = passwordStrengthCalculation(value)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
    >
      <Caption
          className="pb_text_input_kit_label"
          dark={dark}
          text={label}
      />
      <div className="text_input_wrapper">
        <If condition={children}>
          {children}
          <Else />
          <input
              {...props}
              className="text_input"
              disabled={disabled}
              id={id}
              name={name}
              onChange={onChange}
              placeholder={placeholder}
              ref={ref}
              required={required}
              type={type}
              value={value}
          />
          <Choose>
            <When condition={variant === 'passwordStrength'}>
              <Caption>{passwordText}</Caption>
            </When>
            <When condition={variant === 'passwordStrength1'}>
              <meter
                  max="4"
                  min="0"
                  optimum="3"
                  value={passwordStrength}
              />
            </When>
            <When condition={variant === 'passwordStrength2'}>
              <>
                <ProgressSimple
                    max={4}
                    value={passwordStrength}
                    variant={passwordColorVariant}
                />
                <Caption>{passwordText}</Caption>
              </>
            </When>
          </Choose>
          <If condition={error}>
            <Body
                status="negative"
                text={error}
            />
          </If>
        </If>
      </div>
    </div>
  )
}

export default forwardRef(TextInput)
