/* @flow */

import React from 'react'
import Body from '../pb_body/_body.jsx'
import Icon from '../pb_icon/_icon.jsx'

type CheckboxProps = {
  checked?: Boolean,
  dark?: Boolean,
  name: String,
  text: String,
  value: String,

}

const Checkbox = ({
  checked=false,
  dark=false,
  name='',
  text='',
  value='',

}: CheckboxProps) => {
  const bodyClassName = {
    'pb_checkbox_label': true,
    '_dark': dark,
  }

  return (
    <label
        className={
        'pb_checkbox_kit' +
        (dark === true ? '_dark' : '')
      }
    >
      {' '}
      <input
          defaultChecked={checked}
          name={name}
          type="checkbox"
          value={value}
      />
      <span className="pb_checkbox_checkmark">
        <Icon
            className="check_icon"
            fixedWidth
            icon="check"
        />
      </span>
      <Body className={bodyClassName}>{text}</Body>
    </label>
  )
}

export default Checkbox
