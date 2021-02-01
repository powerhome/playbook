import React from 'react'
import DistributionBar from '../_distribution_bar.jsx'

const DistributionBarCustomColors = (props) => {
  return (
    <React.Fragment>
      <div>
        <DistributionBar
            colors={['data_7', 'data_1', 'data_6']}
            widths={[4, 5, 3]}
            {...props}
        />
      </div>
    </React.Fragment>
  )
}

export default DistributionBarCustomColors
