/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import {
  Body,
  StatChange,
  StatValue,
} from '../'

type DashboardValueProps = {
  align?: 'left' | 'center' | 'right',
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  statChange?: {
    change?: string,
    value?: string | Number
  },
  statLabel?: string,
  statValue?: {
    unit?: string,
    value?: string | Number
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
  const classes = classnames(
    buildCss('pb_dashboard_value_kit', align),
    globalProps(props),
    className
  )

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
