/* @flow */

import React from 'react'
import Body from '../pb_body/_body.jsx'
import Icon from '../pb_icon/_icon.jsx'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

type CheckboxProps = {
  aria?: object,
  checked?: boolean,
  className?: string,
  dark?: boolean,
  data?: object,
  error?: boolean,
  id?: string,
  name: string,
  text: string,
  value: string,
  children: Node,
  onChange: (boolean) => void,
}

const Checkbox = (props: CheckboxProps) => {
  const {
    aria = {},
    checked = false,
    className,
    dark = false,
    data = {},
    error = false,
    id,
    name = '',
    text = '',
    value = '',
    children = null,
    onChange = () => {},
  } = props

  const dataProps = buildDataProps(data)
  const ariaProps = buildAriaProps(aria)
  const classes = classnames(
    buildCss('pb_checkbox_kit', { checked: checked, error: error }),
    globalProps(props),
    className
  )

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
            type="checkbox"
            value={value}
        />
      </If>

      <span className="pb_checkbox_checkmark">
        <Icon
            className="check_icon"
            fixedWidth
            icon="check"
        />
      </span>
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
