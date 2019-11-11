/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type SelectableCardProps = {
  checked?: Boolean,
  className?: String,
  data?: String,
  disabled?: Boolean,
  icon?: Boolean,
  id?: String,
  name?: String,
  showSelected?: Boolean,
  showUnselected?: Boolean,
  text?: String,
  value?: String,

}

const SelectableCard = ({ 
  checked,
  className,
  data,
  disabled,
  icon,
  id,
  name,
  showSelected,
  showUnselected,
  text,
  value
}: SelectableCardProps) => (
  <span className={className}>
    <input type="checkbox" name={name} id={id} value={value} checked={checked}/>
    <label for={name}>
      {text}
      <div className={"pb_selectable_card_circle"}> 
        <svg icon={icon}></svg>
      </div>
    </label>
  </span>
)

export default SelectableCard