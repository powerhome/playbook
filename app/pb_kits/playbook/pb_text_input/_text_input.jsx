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
  dark: boolean,
  data?: object,
  error?: string,
  id?: string,
  name: string,
  label: string,
  onChange: (String) => void,
  placeholder: string,
  type: string,
  value: string | number,
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
    >
      <Caption
          className="pb_text_input_kit_label"
          dark={dark}
          text={label}
      />
      <div className={classnames('text_input_wrapper', globalProps(props))}>
        <If condition={children}>
          {children}
          <Else />
          <input
              {...props}
              className="text_input"
              id={id}
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
