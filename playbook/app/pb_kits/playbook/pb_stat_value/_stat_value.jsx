/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import Title from '../pb_title/_title'

type StatValueProps = {
  className?: string,
  id?: string,
  unit?: string,
  value: string | number
}

const StatValue = (props: StatValueProps) => {
  const {
    className,
    id,
    unit,
    value = 0,
  } = props

  const displayValue = function(value) {
    if (value || value === 0) {
      return (
        <Title
            size={1}
            tag="span"
            text={`${value}`}
        />
      )
    }
  }

  const displayUnit = function(unit) {
    if (unit) {
      return (
        <Title
            size={3}
            tag="span"
            text={unit}
        />
      )
    }
  }

  return (
    <div
        className={classnames('pb_stat_value_kit', globalProps(props), className)}
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
