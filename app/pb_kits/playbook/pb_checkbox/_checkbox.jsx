/* @flow */

import React from 'react'
import Body from '../pb_body/_body.jsx'
import Icon from '../pb_icon/_icon.jsx'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

type CheckboxProps = {
  checked?: Boolean,
  dark?: Boolean,
  error?: Boolean,
  name: String,
  text: String,
  value: String,
  children: Node,
  onChange: (Boolean) => void,
}

const Checkbox = (props: CheckboxProps) => {
  const {
    checked = false,
    dark = false,
    error = false,
    name = '',
    text = '',
    value = '',
    children = null,
    onChange = () => {},
  } = props

  return (
    <label
        className={classnames('pb_checkbox_kit' +
        (dark === true ? '_dark' : '') +
        (error === true ? ' error' : ''), spacing(props))

      }
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
