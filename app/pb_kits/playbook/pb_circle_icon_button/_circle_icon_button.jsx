/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

/*
// Un-comment to import kits here
import { Body } from '../'
*/

type CircleIconButtonProps = {
  className?: String,
  data?: String,
  id?: String,
  
}

const CircleIconButton = ({ className, data, id }: CircleIconButtonProps) => (
  <div>
    {`kit content`}
  </div>
)

export default CircleIconButton
