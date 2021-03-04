/* @flow */
import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { Body, Caption, Card, Flex, Icon } from '../'
import { globalProps } from '../utilities/globalProps.js'

import { buildAriaProps, buildDataProps } from '../utilities/props'

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
    alignment?: 'right' | 'left',
    border?: boolean,
  },
}

const TextInput = (props: TextInputProps, ref: React.ElementRef<"input">) => {
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
    addOn = { icon: null, alignment: 'right', border: true },
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const borderToChange = addOn.alignment == 'left' ? 'right' : 'left'
  const borderToggle = addOn.border ? 'on' : 'off'
  const borderCss = `border_${borderToChange}_${borderToggle}`

  const shouldShowAddOn = addOn.icon !== null
  const addOnClass = shouldShowAddOn ? 'text_input_wrapper_add_on' : null
  const css = classnames([
    'pb_text_input_kit',
    error ? 'error' : null,
    globalProps(props),
    className,
  ])
  const addOnIcon = (
    <Icon
        className="add-on-icon"
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
  const addOnBorder = (
    <React.Fragment>
      <If condition={addOn.border == true}>
        <SectionSeparator
            {...props}
            orientation="vertical"
        />
      </If>
    </React.Fragment>
  )
  const addOnInput = (
    <React.Fragment>
      <Flex
          inline="flex-container"
          vertical="stretch"
      >
        <If condition={addOn.alignment == 'left'}>
          { addOnIcon }
          { addOnBorder }
          { textInput }
        </If>
        <If condition={addOn.alignment == 'right'}>
          { textInput }
          { addOnBorder }
          { addOnIcon }
        </If>
      </Flex>
    </React.Fragment>
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
        <Choose>
          <When condition={children}>
            {children}
          </When>
          <When condition={shouldShowAddOn}>
            { addOnInput }
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
      </div>
    </div>
  )
}

export default forwardRef(TextInput)
