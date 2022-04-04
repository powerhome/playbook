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
          value={10.48}
          {...props}
      />
    </>
  )
}

export default StatValueDefault
