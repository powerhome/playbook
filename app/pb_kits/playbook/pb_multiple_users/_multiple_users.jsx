/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

/*
// Un-comment to import kits here
import { Body } from '../'
*/

type MultipleUsersProps = {
  className?: String,
  data?: String,
  id?: String,

}

const MultipleUsers = ({ className, data, id }: MultipleUsersProps) => (
  <div>
    {`kit content`}
  </div>
)

export default MultipleUsers
