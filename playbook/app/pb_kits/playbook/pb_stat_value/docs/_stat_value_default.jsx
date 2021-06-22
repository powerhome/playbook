import React from 'react'

import StatValue from '../_stat_value'

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
