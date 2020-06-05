/* @flow */

import React from 'react'
import { Body, Title } from '../'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

type ProgressPillsProps = {
  active?: Number,
  steps?: Number,
  title?: String,
  value?: String,
  dark?: Boolean,
}

const showSteps = (steps, active, dark) => {
  const items = []

  for (let step = 1; step <= steps; step++) {
    items.push(ProgressPill({ step, active, dark }))
  }

  return items
}

const ProgressPill = ({ active, dark, step }: ProgressPillProps) => (
  <div
      className={`pb_progress_pill${step <= active ? '_active' : '_inactive'}${
      dark ? '_dark' : null
    }`}
      key={step}
  />
)

const ProgressPills = (props: ProgressPillsProps) => {
  const {
    active = 0,
    steps = 3,
    title = null,
    value = null,
    dark = false,
  } = props
  const darkClass = dark ? '_dark' : ''

  return (
    <div className={classnames(`pb_progress_pills_kit${darkClass}`, spacing(props))}>
      <If condition={title}>
        <div className="progress_pills_status">
          <Title
              dark={dark}
              size={4}
              tag="h4"
              text={title}
          />
          <Body
              color="light"
              dark={dark}
              text={value}
          />
        </div>
      </If>

      <div className="progress_pills">{showSteps(steps, active, dark)}</div>
    </div>
  )
}

export default ProgressPills
