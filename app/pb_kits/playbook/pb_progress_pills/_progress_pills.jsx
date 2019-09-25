/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type ProgressPillsProps = {
  active?: String,
  className?: String,
  data?: String,
  id?: String,
  steps?: String,
}

const ProgressPills = ({ active, className, data, id, steps }: ProgressPillsProps) => (
  <div>
    {`kit content`}
  </div>
)

export default ProgressPills
