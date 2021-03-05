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
    alignment?: "right" | "left",
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

  const addOnAlignment = addOn.alignment === 'left' ? 'left' :'right'
  const borderToChange = addOnAlignment === 'left' ? 'right' : 'left'
  const borderToggle = addOn.border === false ? 'off' : 'on'
  const borderClass = `border_${borderToChange}_${borderToggle}`

  const shouldShowAddOn = addOn.icon !== null
  const addOnCss = shouldShowAddOn ? 'text_input_wrapper_add_on' : null
  const addOnDarkModeCardCss = (shouldShowAddOn && dark) ? 'add-on-card-dark' : null
  const css = classnames([
    'pb_text_input_kit',
    error ? 'error' : null,
    globalProps(props),
    className,
  ])
  const addOnIcon = (
    <Icon
        className="add-on-icon"
        dark={dark}
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

  const addOnInput = (
    <React.Fragment>
      <Flex
          className={`add-on-${addOnAlignment} ${borderClass}`}
          inline="flex-container"
          vertical="center"
      >
        <If condition={addOnAlignment == 'left'}>
          <Card
              className={`${addOnDarkModeCardCss} add-on-card card-left-aligned`}
              dark={dark}
          >
            {addOnIcon}
          </Card>
          {textInput}
          <Else />
          {textInput}
          <Card
              className={`${addOnDarkModeCardCss} add-on-card card-right-aligned`}
              dark={dark}
          >
            {addOnIcon}
          </Card>
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
      <div className={`${addOnCss} text_input_wrapper`}>
        <Choose>
          <When condition={children}>{children}</When>
          <When condition={shouldShowAddOn}>{addOnInput}</When>
          <Otherwise>{textInput}</Otherwise>
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
