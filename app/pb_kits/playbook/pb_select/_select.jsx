/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

import {
  Caption,
  Icon,
} from '../'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type SelectProps = {
  className?: String,
  aria?: object,
  data?: object,
  onChange: PropTypes.func,
  children?: Array<React.ReactChild>,
  options: Array<Object>,
  id?: String,
  label?: String,
  value?: String,
  name?: String,
  dark?: Boolean,
  includeBlank?: String,
  blankSelection?: String,
  required?: Boolean,
  disabled?: Boolean,
  multiple?: Boolean,
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
    children,
    label,
    dark = false,
    name,
    options,
    blankSelection,
    required = false,
    disabled = false,
    multiple = false,
    onChange = () => {},
    aria = {},
    data = {},
  } = props

  const css = buildCss({
    'pb_select': true,
    'dark': dark === true,
  })
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
            className='pb_select_kit_label'
            htmlFor={name}
        >
          <Caption
              dark={dark}
              text={label}
          />
        </label>
      </If>
      <label
          className='pb_select_kit_wrapper'
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
        <Icon
            className='pb_select_kit_caret'
            fixedWidth
            icon="angle-down"
        />
      </label>
    </div>
  )
}

export default Select
