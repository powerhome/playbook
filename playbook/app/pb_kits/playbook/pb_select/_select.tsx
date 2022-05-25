import React, { forwardRef } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps, domSafeProps, GlobalProps } from '../utilities/globalProps'
import type { InputCallback } from '../types'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Icon from '../pb_icon/_icon'

type SelectOption = {
  value: string,
  text: string,
  disabled?: boolean,
}

type SelectProps = {
  aria?: { [key: string]: string },
  blankSelection?: string,
  children?: React.Node,
  compact?: boolean,
  className?: string,
  data?: { [key: string]: string },
  disabled?: boolean,
  error?: string,
  onChange: InputCallback<HTMLSelectElement>,
  options: SelectOption[],
  id?: string,
  includeBlank?: string,
  inline?: boolean,
  label?: string,
  margin: string,
  marginBottom: string,
  multiple?: boolean,
  name?: string,
  required?: boolean,
  value?: string,
} & GlobalProps

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
  compact = false,
  data = {},
  disabled = false,
  error,
  label,
  inline = false,
  multiple = false,
  name,
  onChange = () => {},
  options = [],
  required = false,
  value,
  ...props
}: SelectProps, ref: React.ElementRef<"select">) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const optionsList = createOptions(options)

  const inlineClass = inline ? 'inline' : null
  const compactClass = compact ? 'compact' : null
  const classes = classnames(
    buildCss('pb_select'),
    globalProps({
      ...props,
      marginBottom: props.marginBottom || props.margin || 'sm',
    }),
    className,
    inlineClass,
    compactClass
  )

  const selectWrapperClass = classnames(buildCss('pb_select_kit_wrapper'), { error }, className)
  const selectBody =(() =>{
    if (children) return children
    return (
      <select
          {...domSafeProps(props)}
          disabled={disabled}
          id={name}
          multiple={multiple}
          name={name}
          onChange={onChange}
          ref={ref}
          required={required}
          value={value}
      >
        {blankSelection && <option value="">{blankSelection}</option>}
        {optionsList}
      </select>
    )
  })()

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
    >
      {label &&
        <label
            className="pb_select_kit_label"
            htmlFor={name}
        >
          <Caption text={label} />
        </label>
      }
      <label
          className={selectWrapperClass}
          htmlFor={name}
      >
        {selectBody}
        <Icon
            className="pb_select_kit_caret"
            fixedWidth
            icon="angle-down"
        />
        {error &&
          <Body
              status="negative"
              text={error}
          />
        }
      </label>
    </div>
  )
}

export default forwardRef(Select)
