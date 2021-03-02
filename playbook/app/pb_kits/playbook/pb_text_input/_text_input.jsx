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
    addOn = { icon: null, alignment: 'left' },
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const shouldShowAddOn = addOn.icon !== null ? '_add_on' : null
  const shouldShowAddOnBorder = addOn.border == true ? '_border' : null
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
      {/* ${shouldShowAddOn}${shouldShowAddOnBorder} */}
      <div className={`text_input_wrapper${shouldShowAddOn} text_input_wrapper`}>
        <If condition={children}>
          {children}
          <Else />
          <Choose>
            <When condition={addOn.alignment == 'left' && addOn.icon !== null}>
              <Icon
                  fixedWidth={false}
                  color="lighter"
                  icon={addOn.icon}
              />
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
            </When>
            <When condition={addOn.alignment == 'right' && addOn.icon !== null}>
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
              <Icon
                  fixedWidth={false}
                  color="lighter"
                  icon={addOn.icon}
              />
            </When>
            <Otherwise>
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
