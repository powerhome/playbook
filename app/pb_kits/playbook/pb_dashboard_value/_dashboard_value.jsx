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
  stat_change?: {
    change?: String,
    value?: String | Number
  },
  stat_label?: {
    label?: String
  },
  stat_value?: {
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
    stat_change,
    stat_label,
    stat_value,
  } = props

  const statLabel = function(stat_label) {
    if (stat_label) {
      return (
        <Body color="light">{stat_label.label}</Body>
      )
    }
  }

  const statChange = function(stat_change) {
    if (stat_change) {
      return (
        <StatChange change={stat_change.change} value={stat_change.value} />
      )
    }
  }

  const statValue = function(stat_value) {
    if (stat_value) {
      return (
        <StatValue value={stat_value.value} unit={stat_value.unit} />
      )
    }
  }

  return (
    <div id={id} className={classnames(dashboardValueCSS(props), className)}>
      {statLabel(stat_label)}
      {statValue(stat_value)}
      {statChange(stat_change)}
    </div>
  )
}

export default DashboardValue
