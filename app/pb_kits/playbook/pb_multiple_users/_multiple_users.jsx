/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'


import {
  Body
} from '../'

type MultipleUsersProps = {
  className?: String,
  data?: String,
  id?: String,

}

const MultipleUsers = ({ className, data, id }: MultipleUsersProps) => (
  <div>
    {`pb_multiple_users`}
  </div>
)

export default MultipleUsers
