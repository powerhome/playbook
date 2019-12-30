/* @flow */
import React from 'react'
import classnames from 'classnames'
import { Caption } from '../'

type TextInputProps = {
  className: string,
  dark: boolean,
  name: string,
  label: string,
  onChange: (string) => void,
  placeholder: string,
  type: string,
  value: string | number,
  children: Node,
}

const TextInput = ({
  className,
  dark,
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
        </If>
      </div>
    </div>
  )
}

export default TextInput
