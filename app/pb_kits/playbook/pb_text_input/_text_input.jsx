/* @flow */
import React from 'react'
import classnames from 'classnames'
import {
  Body,
  Caption,
} from '../'

type TextInputProps = {
  className: String,
  dark: boolean,
  error?: String,
  name: String,
  label: String,
  onChange: (String) => void,
  placeholder: String,
  type: String,
  value: String | number,
  children: Node,
}

const TextInput = ({
  className,
  dark = false,
  error,
  name,
  label,
  onChange = () => {},
  placeholder,
  type = 'text',
  value,
  children = null,
}: TextInputProps) => {
  const css = classnames([
    `pb_text_input_kit${dark === true ? '_dark' : ''}`,
    className,
    error ? 'error' : null,
  ])

  return (
    <div className={css}>
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
