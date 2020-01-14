/* @flow */

import React from 'react'
import Body from '../pb_body/_body.jsx'
import Icon from '../pb_icon/_icon.jsx'

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

const Checkbox = ({
  checked = false,
  dark = false,
  error = false,
  name = '',
  text = '',
  value = '',
  children = null,
  onChange = () => {},

}: CheckboxProps) => {
  const bodyClassName = {
    'pb_checkbox_label': true,
  }

  return (
    <label
        className={
        'pb_checkbox_kit' +
        (dark === true ? '_dark' : '') +
        (error === true ? ' error' : '')
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
          className={bodyClassName}
          dark={dark}
          status={error ? 'negative' : null}
      >
        {text}
      </Body>
    </label>
  )
}

export default Checkbox
