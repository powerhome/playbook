import React from 'react'
import DistributionBar from '../_distribution_bar.jsx'

const DistributionBarDefault = (props) => {
  return (
    <React.Fragment>
      <div>
        <DistributionBar
            widths={[1, 2, 3, 4, 5, 3, 3, 7]}
            {...props}
        />
      </div>
      <br />
      <br />
      <div>
        <DistributionBar
            size="sm"
            widths={[1, 2, 3, 4, 5, 3, 3, 7]}
            {...props}
        />
      </div>
    </React.Fragment>
  )
}

export default DistributionBarDefault
