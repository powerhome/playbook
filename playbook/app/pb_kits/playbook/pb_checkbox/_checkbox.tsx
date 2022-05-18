import React, { useEffect, useRef } from 'react'
import Body from '../pb_body/_body'
import Icon from '../pb_icon/_icon'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import classnames from 'classnames'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type CheckboxProps = {
  aria?: {[key: string]: string},
  checked?: boolean,
  children: Node,
  className?: string,
  dark?: boolean,
  data?: object,
  error?: boolean,
  id?: string,
  indeterminate?: boolean,
  name: string,
  onChange: () => void,
  tabIndex: number,
  text: string,
  value: string,
} & GlobalProps

const Checkbox = (props: CheckboxProps): JSX.Element => {
  const {
    aria = {},
    checked = false,
    children = null,
    className,
    dark = false,
    data = {},
    error = false,
    id,
    indeterminate = false,
    name = '',
    onChange = () => {},
    tabIndex,
    text = '',
    value = '',
  } = props

  const checkRef = useRef(null)
  const dataProps = buildDataProps(data)
  const ariaProps = buildAriaProps(aria)
  const classes = classnames(
    buildCss('pb_checkbox_kit', { checked, error, indeterminate }.toString()),
    globalProps(props),
    className
  )

  useEffect(() => {
    if (checkRef.current) {
      checkRef.current.checked = checked
      checkRef.current.indeterminate = indeterminate
    }
  }, [indeterminate, checked])

  return (
    <label
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <If condition={children}>
        {children}
        <Else />
        <input
            defaultChecked={checked}
            name={name}
            onChange={onChange}
            ref={checkRef}
            tabIndex={tabIndex}
            type="checkbox"
            value={value}
        />
      </If>
      <If condition={!indeterminate}>
        <span className="pb_checkbox_checkmark">
          <Icon
              className="check_icon"
              fixedWidth
              icon="check"
          />
        </span>
      </If>

      <If condition={indeterminate}>
        <span className="pb_checkbox_indeterminate">
          <Icon
              className="indeterminate_icon"
              fixedWidth
              icon="minus"
          />
        </span>
      </If>

      <Body
          className="pb_checkbox_label"
          dark={dark}
          status={error ? 'negative' : null}
      >
        {text}
      </Body>
    </label>
  )
}

export default Checkbox
