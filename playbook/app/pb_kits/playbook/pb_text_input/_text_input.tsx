import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import { withReactHookForm } from '../utilities/withReactHookForm'

import Caption from '../pb_caption/_caption'
import Icon from '../pb_icon/_icon'

type TextInputProps = {
  aria?: { [key: string]: string },
  autoComplete?: string,
  className?: string,
  data?: { [key: string]: string },
  defaultValue?: string,
  disabled?: boolean,
  error?: string,
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
  icon?: string,
  iconRight?: boolean,
  id?: string,
  label?: string,
  maxLength?: number,
  name?: string,
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void,
  placeholder?: string,
  readOnly?: boolean,
  required?: boolean,
  type?: string,
  value?: string,
  ref?: React.Ref<HTMLInputElement>,
} & GlobalProps

const TextInput = ({
  aria = {},
  autoComplete,
  className,
  data = {},
  defaultValue,
  disabled = false,
  error,
  htmlOptions = {},
  icon,
  iconRight = false,
  id,
  label,
  maxLength,
  name,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  readOnly = false,
  required = false,
  type = 'text',
  value,
  ref,
  ...props
}: TextInputProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_text_input_kit'),
    { error },
    { icon },
    { icon_right: iconRight },
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
    >
      {label && (
        <Caption
            htmlFor={id || name}
            tag="label"
            text={label}
        />
      )}
      <div className="pb_text_input_wrapper">
        {icon && !iconRight && (
          <Icon
              className="pb_text_input_icon"
              icon={icon}
          />
        )}
        <input
            autoComplete={autoComplete}
            className="pb_text_input"
            defaultValue={defaultValue}
            disabled={disabled}
            id={id || name}
            maxLength={maxLength}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={ref}
            required={required}
            type={type}
            value={value}
        />
        {icon && iconRight && (
          <Icon
              className="pb_text_input_icon"
              icon={icon}
          />
        )}
      </div>
      {error && <Caption className="pb_text_input_error"
          text={error} />}
    </div>
  )
}

const TextInputWithHookForm = withReactHookForm(TextInput)
export default TextInputWithHookForm
