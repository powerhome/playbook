/* @flow */
import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { Body, Caption, Icon } from '../'
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
  children: Node,
  addOn?: {
    icon?: string,
    alignment?: string,
    border?: boolean,
  },
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
    children = null,
    addOn = { icon: null, alignment: 'left', border: true },
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const addOnClass = addOn.icon !== null ? 'text_input_wrapper_add_on' : null
  const shouldShowAddOnBorder = addOn.border == true ? '_border' : null
  // note that there's a kit for border already
  const css = classnames([
    'pb_text_input_kit',
    error ? 'error' : null,
    globalProps(props),
    className,
  ])
  const addOnIcon = (
    <Icon
        color="lighter"
        fixedWidth={false}
        icon={addOn.icon}
    />
  )
  const textInput = (
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
  )

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
      <div className={`${addOnClass} text_input_wrapper`}>
        <If condition={children}>
          {children}
          <Else />
          <Choose>
            <When condition={addOn.icon !== null && addOn.alignment == 'left'}>
              { addOnIcon }
              { textInput }
            </When>
            <When condition={addOn.icon !== null && addOn.alignment == 'right'}>
              { textInput }
              { addOnIcon }
            </When>
            <Otherwise>
              { textInput }
            </Otherwise>
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
