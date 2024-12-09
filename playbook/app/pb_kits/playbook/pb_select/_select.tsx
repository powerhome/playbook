import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { FieldValues } from 'react-hook-form'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps, domSafeProps } from '../utilities/globalProps'
import { HookFormProps, withHookForm } from '../utilities/hookFormProps'
import type { InputCallback } from '../types'
import { getAllIcons } from "../utilities/icons/allicons"

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Icon from '../pb_icon/_icon'

type SelectOption = {
  value: string,
  text: string,
  disabled?: boolean,
}

type SelectProps<T extends FieldValues = FieldValues> = {
  aria?: { [key: string]: string },
  blankSelection?: string,
  children?: Node,
  className?: string,
  compact?: boolean,
  data?: { [key: string]: string },
  disabled?: boolean,
  error?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  includeBlank?: string,
  inline?: boolean,
  label?: string,
  margin?: string,
  marginBottom?: string,
  marginTop?: string,
  multiple?: boolean,
  name?: string,
  onChange?: InputCallback<HTMLSelectElement>,
  options: SelectOption[],
  required?: boolean,
  showArrow?: boolean,
  value?: string,
} & GlobalProps & Partial<HookFormProps<T>>

const createOptions = (options: SelectOption[]) => options.map((option, index) => (
  <option
      disabled={option.disabled}
      key={index}
      value={option.value}
  >
    {option.text || option.value}
  </option>
))

type SelectComponent = <T extends FieldValues = FieldValues>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLSelectElement> }
) => React.ReactElement

const Select = <T extends FieldValues = FieldValues>({
  aria = {},
  blankSelection,
  children,
  className,
  compact = false,
  data = {},
  disabled = false,
  error,
  label,
  htmlOptions = {},
  inline = false,
  multiple = false,
  name,
  onChange,
  options = [],
  register,
  required = false,
  rules,
  showArrow = false,
  value,
  ...props
}: SelectProps<T>, ref: React.Ref<HTMLSelectElement>) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const optionsList = createOptions(options)
  const hookFormProps = name ? withHookForm({ register, name, rules }) : {}

  const inlineClass = inline ? 'inline' : null
  const compactClass = compact ? 'compact' : null
  const classes = classnames(
    buildCss("pb_select"),
    globalProps({
      ...props,
      marginBottom: props.marginBottom || props.margin || "sm",
    }),
    className,
    inlineClass,
    { show_arrow: showArrow },
    compactClass
  );

  const icons = getAllIcons()
  const angleDown = icons?.angleDown?.icon as { [key: string]: SVGElement }

  const selectWrapperClass = classnames(buildCss('pb_select_kit_wrapper'), { error }, className)
  const selectBody =(() =>{
    if (children) return children
    return (
      <select
          {...domSafeProps(props)}
          {...hookFormProps}
          disabled={disabled}
          id={name}
          multiple={multiple}
          name={name}
          onChange={onChange || hookFormProps.onChange}
          ref={ref || hookFormProps.ref}
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
        {...htmlProps}
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
        { multiple !== true && angleDown &&
          <Icon
              className="pb_select_kit_caret svg-inline--fa"
              customIcon={angleDown}
              fixedWidth
          />
        }
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

export default forwardRef(Select) as SelectComponent
