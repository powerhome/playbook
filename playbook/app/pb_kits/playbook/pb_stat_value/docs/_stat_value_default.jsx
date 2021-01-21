import React from 'react'
import { StatValue } from '../../'

const StatValueDefault = (props) => {
  return (
    <>
      <StatValue
          value={1048}
          {...props}
      />
      <br />
      <br />
      <StatValue
          value={0}
          {...props}
      />
    </>
  )
}

export default StatValueDefault
