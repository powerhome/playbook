/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

/*
// Un-comment to import kits here
import { Body } from '../'
*/

type SelectProps = {
  className?: String,
  data?: String,
  id?: String,
  
}

const Select = ({ className, data, id }: SelectProps) => (
  <div>
    {`kit content`}
  </div>
)

export default Select
