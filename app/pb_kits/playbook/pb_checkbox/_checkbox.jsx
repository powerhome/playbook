/* @flow */

import React from 'react'
import Body from '../pb_body/_body.jsx'
import Icon from '../pb_icon/_icon.jsx'

type CheckboxProps = {
  checked?: Boolean,
  dark?: Boolean,
  name:String,
  text: String,
  value:String,

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
        `pb_checkbox_kit` +
        (dark === true ? '_dark' : '')
      }
    > <input type="checkbox" name={name} value={value} defaultChecked={checked}/>
  <span className="pb_checkbox_checkmark">
      <Icon className="check_icon" icon="check" fixedWidth />
    </span>
    <Body className={bodyClassName}>{text}</Body>
    </label>
  )
}

export default Checkbox
