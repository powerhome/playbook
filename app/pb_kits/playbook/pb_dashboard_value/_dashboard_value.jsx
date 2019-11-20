/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  Body,
  StatChange,
  StatValue,
} from '../'

type DashboardValueProps = {
  align?: 'left' | 'center' | 'right',
  className?: String,
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

const dashboardValueCSS = ({
  align='left',

}: DashboardValueProps) => {

  const alignStyle = align !== '' ? `_${align}` : ''

  return 'pb_dashboard_value_kit' + alignStyle
}

const DashboardValue = (props: DashboardValueProps) => {
  const {
    align='left',
    className,
    id,
    statChange,
    statLabel,
    statValue,
  } = props

  return (
    <div id={id} className={classnames(dashboardValueCSS(props), className)}>
      <If condition={statLabel}>
        <Body color="light">{statLabel}</Body>
      </If>
      <If condition={statValue}>
        <StatValue value={statValue.value} unit={statValue.unit} />
      </If>
      <If condition={statChange}>
        <StatChange change={statChange.change} value={statChange.value} />
      </If>
    </div>
  )
}

export default DashboardValue
