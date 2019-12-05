import React from 'react'
import DistributionBar from '../_distribution_bar.jsx'

const DistributionBarDefault = () => {
  return (
    <React.Fragment>
      <div>
        <DistributionBar
            widths={[1, 2, 3, 4, 5, 3, 3, 7]}
        />
      </div>
      <br />
      <br />
      <div>
        <DistributionBar
            size='sm'
            widths={[1, 2, 3, 4, 5, 3, 3, 7]}
        />
      </div>
    </React.Fragment>
  )
}

export default DistributionBarDefault
