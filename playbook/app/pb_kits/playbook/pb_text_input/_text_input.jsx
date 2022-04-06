/* @flow */
import React, { forwardRef } from 'react'
import classnames from 'classnames'

import { globalProps, domSafeProps } from '../utilities/globalProps'
import { buildAriaProps, buildDataProps } from '../utilities/props'

import Flex from '../pb_flex/_flex'
import Card from '../pb_card/_card'
import Caption from '../pb_caption/_caption'
import Body from '../pb_body/_body'
import Icon from '../pb_icon/_icon'

type TextInputProps = {
  aria?: object,
  className: string,
  data?: object,
  dark?: boolean,
  disabled?: boolean,
  error?: string,
  id?: string,
  inline?: boolean,
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
    addOn = { icon: null, alignment: 'right', border: true },
    aria = {},
    className,
    dark = false,
    data = {},
    disabled,
    error,
    id,
    inline = false,
    name,
    label,
    onChange = () => {},
    placeholder,
    required,
    type = 'text',
    value = '',
    children = null,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const { alignment, border, icon } = addOn
  const addOnAlignment = alignment === 'left' ? 'left' : 'right'
  const borderToChange = addOnAlignment === 'left' ? 'right' : 'left'
  const borderToggle = border === false ? 'off' : 'on'
  const borderCss = `border_${borderToChange}_${borderToggle}`

  const shouldShowAddOn = icon !== null
  const addOnCss = shouldShowAddOn ? 'text_input_wrapper_add_on' : null
  const addOnDarkModeCardCss = (shouldShowAddOn && dark) ? 'add-on-card-dark' : null
  const css = classnames([
    'pb_text_input_kit',
    inline ? 'inline' : null,
    error ? 'error' : null,
    globalProps(props),
    className,
  ])
  const addOnIcon = (
    <Icon
        className="add-on-icon"
        dark={dark}
        fixedWidth={false}
        icon={icon}
    />
  )
  const textInput = (
    <input
        {...domSafeProps(props)}
        className="text_input"
        disabled={disabled}
        id={id}
        key={id}
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
          className={`add-on-${addOnAlignment} ${borderCss}`}
          inline="flex-container"
          vertical="center"
      >
        <If condition={addOnAlignment == 'left'}>
          <>
            <Card
                className={`${addOnDarkModeCardCss} add-on-card card-left-aligned`}
                dark={dark}
            >
              {addOnIcon}
            </Card>
            {textInput}
          </>
        <Else />
          <>
            {textInput}
            <Card
                className={`${addOnDarkModeCardCss} add-on-card card-right-aligned`}
                dark={dark}
            >
              {addOnIcon}
            </Card>
          </>
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
