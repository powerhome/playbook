/* @flow */

import React from 'react'

import {
  Body,
  Caption,
  Icon,
} from '../'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type SelectProps = {
  aria?: object,
  blankSelection?: String,
  children?: Array<React.ReactChild>,
  className?: String,
  dark?: Boolean,
  data?: object,
  disabled?: Boolean,
  error?: String,
  onChange: PropTypes.func,
  options: Array<Object>,
  id?: String,
  includeBlank?: String,
  label?: String,
  multiple?: Boolean,
  name?: String,
  required?: Boolean,
  value?: String,
}

const optionsArray = ({ options = [] }: SelectProps) => {
  return options.map((optionObject, index) => {
    return (
      <option
          disabled={optionObject.disabled}
          key={index}
          selected={optionObject.selected}
          value={optionObject.value}
      >
        {optionObject.valueText || optionObject.value}
      </option>
    )
  })
}

const Select = (props: SelectProps) => {
  const {
    aria = {},
    blankSelection,
    children,
    dark = false,
    data = {},
    disabled = false,
    error,
    label,
    multiple = false,
    name,
    onChange = () => {},
    options,
    required = false,
  } = props

  const errorClass = error ? ' error' : ''
  const css = buildCss({
    'pb_select': true,
    'dark': dark === true,
  }) + errorClass
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const optionsList = optionsArray({ options })

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
    >
      <If condition={label}>
        <label
            className="pb_select_kit_label"
            htmlFor={name}
        >
          <Caption
              dark={dark}
              text={label}
          />
        </label>
      </If>
      <label
          className="pb_select_kit_wrapper"
          htmlFor={name}
      >
        <If condition={children}>
          {children}
          <Else />
          <select
              disabled={disabled}
              id={name}
              multiple={multiple}
              name={name}
              onChange={onChange}
              required={required}
          >
            <If condition={blankSelection}>
              <option value="">{blankSelection}</option>
            </If>
            {optionsList}
          </select>
        </If>
        <If condition={error}>
          <Body
              dark={dark}
              status="negative"
              text={error}
          />
        </If>
        <Icon
            className="pb_select_kit_caret"
            fixedWidth
            icon="angle-down"
        />
      </label>
    </div>
  )
}

export default Select
