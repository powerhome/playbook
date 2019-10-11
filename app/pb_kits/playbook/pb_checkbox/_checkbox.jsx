/* @flow */

import React from 'react'
import Body from '../pb_body/_body.jsx'
import Icon from '../pb_icon/_icon.jsx'

type CheckboxProps = {
  dark?: Boolean,
  label: String,
  name:String,
  value:String,
  checked?: Boolean,
}

const Checkbox = ({
  dark=false,
  name='',
  value='',
  label='',
  checked=false,
}: CheckboxProps) => {


  return (
    <label
        className={
        `pb_checkbox_kit` +
        (dark === true ? '_dark' : '')
      }
    > <input type="checkbox" name={name} value={value} defaultChecked={checked}/>
  <span className="pb_checkbox_checkmark">
      <Icon className="check_icon" icon="check" fixedWidth />
    </span>
    <Body className={(dark === true ? '_dark' : '') + ` pb_checkbox_label`}  >{label}</Body>
    </label>
  )
}

export default Checkbox
