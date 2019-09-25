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

const SelectableCard = ({ checked, className, data, disabled, id, name, showSelected, showUnselected, text, value }: SelectableCardProps) => (
  <div>
    {`kit content`}
  </div>
)

export default SelectableCard
