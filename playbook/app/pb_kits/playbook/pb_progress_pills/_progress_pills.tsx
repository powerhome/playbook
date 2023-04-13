import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Title from '../pb_title/_title'

type ProgressPillsProps = {
  active?: number,
  aria?: {[key: string]: string},
  className?: string,
  data?: { [key: string]: string },
  dark?: boolean,
  id?: string,
  steps?: number,
  title?: string,
  value?: string,
}

const showSteps = (steps: number, active: number, dark: boolean) => {
  const items = []

  for (let step = 1; step <= steps; step++) {
    items.push(ProgressPill({ steps: step, active, dark }))
  }

  return items
}

const ProgressPill = ({ active, dark, steps: step }: ProgressPillsProps) => (
  <div
    className={`pb_progress_pill${step <= active ? '_active' : '_inactive'}${dark ? ' dark' : ''
      }`}
    key={step}
  />
)

const ProgressPills = (props: ProgressPillsProps) => {
  const {
    active = 0,
    aria = { hidden: 'true' },
    className,
    data = {},
    id,
    steps = 3,
    title,
    value,
    dark = false,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_progress_pills_kit'), globalProps(props), className)

  return (
    <div
      {...ariaProps}
      {...dataProps}
      className={classes}
      id={id}
    >
      {title &&
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
        </div>}
      <div className="progress_pills">{showSteps(steps, active, dark)}</div>
    </div>
  )
}

export default ProgressPills
