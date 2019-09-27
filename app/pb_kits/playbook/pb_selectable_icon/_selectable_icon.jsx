/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type SelectableIconProps = {
  className?: String,
  data?: String,
  id?: String,
  label?: String,
  select?: Boolean,
  
}

const SelectableIcon = ({ className, data, id, label, select }: SelectableIconProps) => (
  <div>
    {`kit content`}
  </div>
)

export default SelectableIcon
