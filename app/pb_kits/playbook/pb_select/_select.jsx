/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import {
  Caption,
  Icon,
} from "../"

import {
  buildAriaProps,
  buildDataProps,
  buildCss,
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


const optionsArray = ({options=[]}: SelectProps) => {
  return options.map((optionObject, index) => {
    return (
      <option
        value={optionObject.value}
        selected={optionObject.selected}
        disabled={optionObject.disabled}
      >{optionObject.valueText || optionObject.value}</option>
    );
  })
}

const Select = ( props: SelectProps) => {

  const {
    className,
    children,
    label,
    value,
    dark=false,
    name,
    id,
    options,
    includeBlank,
    blankSelection,
    required=false,
    disabled=false,
    multiple=false,
    onChange=() => {},
    aria = {},
    data = {},
  } = props

  const css = buildCss({
    'pb_select': true,
    'dark': dark === true,
  })
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const optionsList = optionsArray({options})

  return (
    <div {...ariaProps} {...dataProps} className={css}>
      <If condition={label}>
        <label className='pb_select_kit_label' htmlFor={name}>
          <Caption text={label} dark={dark}/>
        </label>
      </If>
      <label className='pb_select_kit_wrapper' htmlFor={name}>
        <If condition={children}>
          {children}
        <Else/>
          <select
            name={name}
            id={name}
            disabled={disabled}
            required={required}
            multiple={multiple}
            onChange={onChange}>
            <If condition={blankSelection}>
              <option value="">{blankSelection}</option>
            </If>
            {optionsList}
          </select>
        </If>
        <Icon icon="angle-down" className='pb_select_kit_caret' fixedWidth />
      </label>
    </div>
  )
}


export default Select
