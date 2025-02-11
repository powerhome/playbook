import React, { useEffect, useRef, forwardRef } from 'react'
import Body from '../pb_body/_body'
import Icon from '../pb_icon/_icon'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import classnames from 'classnames'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type CheckboxProps = {
  aria?: {[key: string]: string},
  checked?: boolean,
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  dark?: boolean,
  data?: {[key: string]: string},
  disabled?: boolean,
  error?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  indeterminate?: boolean,
  name?: string,
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void,
  tabIndex?: number,
  text?: string,
  value?: string,
} & GlobalProps

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    aria = {},
    checked = false,
    children,
    className,
    dark = false,
    data = {},
    disabled = false,
    error = false,
    htmlOptions = {},
    id,
    indeterminate = false,
    name = '',
    onChange = () => { void 0 },
    tabIndex,
    text = '',
    value = '',
  } = props

  const internalRef = useRef<HTMLInputElement>(null)
  const setRefs = (el: HTMLInputElement) => {
    internalRef.current = el
    if (typeof ref === 'function') {
      ref(el)
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
    }
  }
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const classes = classnames(
    buildCss('pb_checkbox_kit', checked ? 'checked' : null, error ? 'error' : null, indeterminate? 'indeterminate' : null),
    globalProps(props),
    className
  )

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.checked = checked
      internalRef.current.indeterminate = indeterminate
    }
  }, [indeterminate, checked])

  const checkboxChildren = () => {
    if (children)
      return (children)
    else
    return (
    <input
        defaultChecked={checked}
        disabled={disabled}
        name={name}
        onChange={onChange}
        ref={setRefs}
        tabIndex={tabIndex}
        type="checkbox"
        value={value}
    />)
  }

  return (
    <label
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <>{checkboxChildren()}</>

      {!indeterminate &&
        <span className="pb_checkbox_checkmark">
          <Icon
              className="check_icon"
              fixedWidth
              icon="check"
          />
        </span>
      }

      {indeterminate &&
        <span className="pb_checkbox_indeterminate">
          <Icon
              className="indeterminate_icon"
              fixedWidth
              icon="minus"
          />
        </span>
      }

      <Body
          className="pb_checkbox_label"
          dark={dark}
          status={error ? 'negative' : null}
          variant={null}
      >
        {text}
      </Body>
    </label>
  )
})

Checkbox.displayName = "Checkbox"
export default Checkbox
