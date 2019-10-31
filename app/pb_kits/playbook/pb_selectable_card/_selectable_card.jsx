/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type SelectableCardProps = {
  checked?: Boolean,
  className?: String,
  data?: String,
  disabled?: Boolean,
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
  id,
  name,
  showSelected,
  showUnselected,
  text,
  value
}: SelectableCardProps) => (
  <span className={className}>
    <input type="checkbox" name={name} id={id} value={value} checked={checked}/>
    <label for={name}>{text}</label>
  </span>
)

export default SelectableCard