/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type ProgressPillsProps = {
  active?: String,
  steps?: String,
}

const printSteps = (steps, active) => {
  let items = []

  for(let step = 1; step <= steps; step++) {
    items.push(<span className={step <= active ? "active" : "inactive"}></span>)
  }

  return items
}

const ProgressPills = ({ active = 0, steps = 0 }: ProgressPillsProps) => (
  <div className="pb_progress_pills_kit">
    {printSteps(steps, active)}
  </div>
)

export default ProgressPills
