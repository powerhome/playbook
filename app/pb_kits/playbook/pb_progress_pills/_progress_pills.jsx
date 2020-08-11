/* @flow */

import React from 'react'
import { Body, Title } from '../'
import classnames from 'classnames'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

type ProgressPillsProps = {
  active?: number,
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  steps?: number,
  title?: string,
  value?: string,
}

const showSteps = (steps, active) => {
  const items = []

  for (let step = 1; step <= steps; step++) {
    items.push(ProgressPill({ step, active }))
  }

  return items
}


const ProgressPill = ({ active, step }: ProgressPillProps) => (
  <div
      className={`pb_progress_pill${step <= active ? '_active' : '_inactive'}` }
      key={step}
  />
)

const ProgressPills = (props: ProgressPillsProps) => {
  const {
    active = 0,
    aria = {},
    className,
    data = {},
    id,
    steps = 3,
    title,
    value,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_progress_pills_kit'), className, globalProps(props))
  const darkPill = classes.includes('dark') ? '_dark' : ''

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >

      <If condition={title}>
        <div className="progress_pills_status">
          <Title
              size={4}
              tag="h4"
              text={title}
          />
          <Body
              color="light"
              text={value}
          />
        </div>
      </If>
      <div className="progress_pills">{showSteps(steps, active, darkPill) }</div>
    </div>
  )
}

export default ProgressPills
