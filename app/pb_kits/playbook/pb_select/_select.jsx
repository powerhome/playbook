/* @flow */

import React from 'react'
import classnames from 'classnames'
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

import { globalProps } from '../utilities/globalProps.js'

import type { InputCallback } from '../types'

type SelectOption = {
  value: string,
  text: string,
  disabled?: boolean,
}

type SelectProps = {
  aria?: object,
  blankSelection?: string,
  children?: React.Node,
  className?: string,
  data?: object,
  disabled?: boolean,
  error?: string,
  onChange: InputCallback<HTMLSelectElement>,
  options: SelectOption[],
  id?: string,
  includeBlank?: string,
  label?: string,
  multiple?: boolean,
  name?: string,
  required?: boolean,
  value?: string,
}

const createOptions = (options: SelectOption[]) => options.map((option, index) => (
  <option
      disabled={option.disabled}
      key={index}
      value={option.value}
  >
    {option.text || option.value}
  </option>
))

const Select = ({
  aria = {},
  blankSelection,
  children,
  className,
  data = {},
  disabled = false,
  error,
  label,
  multiple = false,
  name,
  onChange = () => {},
  options = [],
  required = false,
  value,
  ...props
}: SelectProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const optionsList = createOptions(options)

  const classes = classnames(buildCss('pb_select'), className, globalProps(props))
  const selectWrapperClass = classnames(buildCss('pb_select_kit_wrapper'), { error }, className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
    >
      <If condition={label}>
        <label
            className="pb_select_kit_label"
            htmlFor={name}
        >
          <Caption
              text={label}
          />
        </label>
      </If>
      <label
          className={selectWrapperClass}
          htmlFor={name}
      >
        <If condition={children}>
          {children}
          <Else />
          <select
              {...props}
              disabled={disabled}
              id={name}
              multiple={multiple}
              name={name}
              onChange={onChange}
              required={required}
              value={value}
          >
            <If condition={blankSelection}>
              <option value="">{blankSelection}</option>
            </If>
            {optionsList}
          </select>
        </If>
        <If condition={error}>
          <Body
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
