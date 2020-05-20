/* @flow */
import React from 'react'
import classnames from 'classnames'
import {
  Body,
  Caption,
} from '../'

import {
  buildAriaProps,
  buildDataProps,
} from '../utilities/props'

type TextInputProps = {
  aria?: object,
  className: String,
  dark: boolean,
  data?: object,
  error?: String,
  id?: String,
  name: String,
  label: String,
  onChange: (String) => void,
  placeholder: String,
  type: String,
  value: String | number,
  children: Node,
}

const TextInput = ({
  aria = {},
  className,
  dark = false,
  data = {},
  error,
  id,
  name,
  label,
  onChange = () => {},
  placeholder,
  type = 'text',
  value,
  children = null,
  ...props
}: TextInputProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames([
    `pb_text_input_kit${dark === true ? '_dark' : ''}`,
    className,
    error ? 'error' : null,
  ])

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
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
              name={name}
              onChange={onChange}
              placeholder={placeholder}
              type={type}
              value={value}
          />
          <If condition={error}>
            <Body
                dark={dark}
                status="negative"
                text={error}
            />
          </If>
        </If>
      </div>
    </div>
  )
}

export default TextInput
