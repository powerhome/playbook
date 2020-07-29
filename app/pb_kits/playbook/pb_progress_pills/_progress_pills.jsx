/* @flow */

import React from 'react'
import { Body, Title } from '../'
import classnames from 'classnames'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import { systemProps } from '../utilities/systemProps.js'

type ProgressPillsProps = {
  active?: Number,
  aria?: object,
  className?: String,
  data?: object,
  id?: String,
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
      dark ? '_dark' : ''
    }`}
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
    dark = false,
  } = props
  const darkClass = dark ? '_dark' : ''

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_progress_pills_kit', darkClass), className, systemProps(props))

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
