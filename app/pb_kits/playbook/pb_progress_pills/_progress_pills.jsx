/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'


// Un-comment to import kits here
import { Body,Title } from '../'


type ProgressPillsProps = {
  active?: Number,
  steps?: Number,
  status?: String,
  text?: String,
  dark?: Boolean,
}

const showSteps = (steps, active, dark) => {
  let items = []

  for(let step = 1; step <= steps; step++) {
    items.push(<div className={`pb_progress_pill${step <= active ? "_active" : "_inactive"}${dark ? "_dark" : null}`} key={step}></div>)
  }

  return items
}

const ProgressPills = ({ active = 0, steps = 3, status = null, text = null, dark=false }: ProgressPillsProps) => (
  <div className={`pb_progress_pills_kit${dark ? "_dark": null}`}>
    {status ?
    <div className="status">
      <Title text={status} size={4} tag="h4" dark={dark}/>
      <Body color="light" text={text} dark={dark}/>
    </div> : null}

    <div className="pills">
      {showSteps(steps, active, dark)}
    </div>
  </div>
)

export default ProgressPills
