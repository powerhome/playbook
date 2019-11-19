/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import { Body,Title } from '../'


type ProgressPillsProps = {
  active?: Number,
  steps?: Number,
  title?: String,
  value?: String,
  dark?: Boolean,

}

const showSteps = (steps, active, dark) => {
  let items = []

  for(let step = 1; step <= steps; step++) {
    items.push(ProgressPill({step,active,dark}))
  }

  return items
}

const ProgressPill = ({
    active,
    dark,
    step,
}: ProgressPillProps) => (<div className={`pb_progress_pill${step <= active ? "_active" : "_inactive"}${dark ? "_dark" : null}`} key={step}></div>)

const ProgressPills = ({ active = 0, steps = 3, title = null, value = null, dark=false } : ProgressPillsProps) => {

  const darkClass = dark ? "_dark" : ""

  return(
    <div className={`pb_progress_pills_kit${darkClass}`}>
      {title ?
      <div className="progress_pills_status">
        <Title text={title} size={4} tag="h4" dark={dark}/>
        <Body color="light" text={value} dark={dark}/>
      </div> : null}

    <div className="progress_pills">
      {showSteps(steps, active, dark)}
    </div>
  </div>
)}

export default ProgressPills
