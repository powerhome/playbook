/* @flow */

import React from 'react'

type CheckboxProps = {
  dark?: Boolean,
  tag: String,
  label: String,
  name:String,
  value:String,
  checked?: Boolean,
}

const Checkbox = ({
  dark=false,
  tag='label',
  label,
  name='',
  value='',
  checked=false,
}: CheckboxProps) => {

  const Tag = `${tag}`

  return (
    <Tag
        className={
        `pb_checkbox_kit` +
        (dark === true ? '_dark' : '')
      }
    > <input type="checkbox" name={name} value={value} defaultChecked={checked}/>
  <span className="pb_checkbox_checkmark">
      <i className="far fa-check check_icon"></i>
    </span>
    <span className="pb_checkbox_label">
      {label}
    </span>
    </Tag>
  )
}

export default Checkbox
