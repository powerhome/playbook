/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import { Icon } from '../'

type SelectableCardProps = {
  checked?: Boolean,
  children?: Array<React.ReactChild>,
  className?: String,
  dark?: Boolean,
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
  children,
  className,
  dark,
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
  <span className={className} >
    <input type="checkbox" name={name} id={id} value={value} defaultChecked={checked} showSelected />
    <label htmlFor={name} dark>
      { text || children }
      <div className={"pb_selectable_card_circle"}> 
        <Icon icon="check" fixedWidth/>
      </div>
    </label>
  </span>
)

export default SelectableCard