/* @flow */

import React from 'react'
import {
  Title
} from '../'

type SelectableIconProps = {
  className?: String,
  tag: String,
  label: String,
  checked?: Boolean,
  icon: String,
  id: String,
  name: String,
  value: String
}

const SelectableIcon = ({
  icon,
  className='',
  tag='label',
  label='',
  checked=false,
  id='',
  name='',
  value='',
}: SelectableIconProps) => {

  const Tag = `${tag}`
  const iconClass = `far fa-${icon} fa-2x`
  const kitClass = `pb_selectable_icon_kit`

  return (
    <Tag
    className={kitClass}>
      <div className="pb_selectable_icon_wrapper">
      <input type="checkbox" defaultChecked={checked}/>
        <div className="pb_selectable_icon_kit_icon">
          <i className={iconClass}></i>
        </div>
        <Title
          className="pb_selectable_icon_kit_title"
          size={4}
          text={label}
          />
      </div>
    </Tag>
  )
}

export default SelectableIcon
