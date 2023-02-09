import React from 'react'
import StatValue from '../_stat_value'

const StatValueUnit = (props) => {
  return (
    <StatValue
        unit="appt"
        value="5,294"
        {...props}
    />
  )
}

export default StatValueUnit
