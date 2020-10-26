/* @flow */
import React from 'react'
import classnames from 'classnames'
import { Body, Caption } from '../'
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
  error?: boolean,
  errorMessage?: string,
  id?: string,
  name: string,
  label: string,
  onChange: (String) => void,
  placeholder: string,
  required?: boolean,
  type: string,
  value: string | number,
  children: Node,
}

const TextInput = (props: TextInputProps) => {
  const {
    aria = {},
    className,
    data = {},
    dark = false,
    disabled,
    error,
    errorMessage,
    id,
    name,
    label,
    onChange = () => {},
    placeholder,
    required,
    type = 'text',
    value,
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
              required={required}
              type={type}
              value={value}
          />
          <If condition={error}>
            <Body
                status="negative"
                text={errorMessage}
            />
          </If>
        </If>
      </div>
    </div>
  )
}

export default TextInput
