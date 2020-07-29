/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { systemProps } from '../utilities/systemProps.js'
import {
  Body,
  StatChange,
  StatValue,
} from '../'

type DashboardValueProps = {
  align?: 'left' | 'center' | 'right',
  aria?: object,
  className?: String,
  data?: object,
  id?: String,
  statChange?: {
    change?: String,
    value?: String | Number
  },
  statLabel?: String,
  statValue?: {
    unit?: String,
    value?: String | Number
  }
}

const DashboardValue = (props: DashboardValueProps) => {
  const {
    align = 'left',
    aria = {},
    className,
    data = {},
    id,
    statChange = {},
    statLabel,
    statValue = {},
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_dashboard_value_kit', align), className, systemProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <If condition={statLabel}>
        <Body color="light">{statLabel}</Body>
      </If>
      <If condition={statValue}>
        <StatValue
            unit={statValue.unit}
            value={statValue.value}
        />
      </If>
      <If condition={statChange}>
        <StatChange
            change={statChange.change}
            value={statChange.value}
        />
      </If>
    </div>
  )
}

export default DashboardValue
