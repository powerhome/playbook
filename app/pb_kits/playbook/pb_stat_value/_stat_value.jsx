/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Title } from '../'
import { systemProps } from '../utilities/systemProps.js'

type StatValueProps = {
  className?: String,
  id?: String,
  unit?: String,
  value: String | Number
}

const StatValue = (props: StatValueProps) => {
  const {
    className,
    id,
    unit,
    value = 0,
  } = props

  const displayValue = function(value) {
    if (value) {
      return (
        <Title
            size={1}
            text={value}
        />
      )
    }
  }

  const displayUnit = function(unit) {
    if (unit) {
      return (
        <Title
            size={3}
            text={unit}
        />
      )
    }
  }

  return (
    <div
        className={classnames('pb_stat_value_kit', className, systemProps(props))}
        id={id}
    >
      <div className="pb_stat_value_wrapper">
        {displayValue(value)}
        &nbsp;
        {displayUnit(unit)}
      </div>
    </div>
  )
}

export default StatValue
