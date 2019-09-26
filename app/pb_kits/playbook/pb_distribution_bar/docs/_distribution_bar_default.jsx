import React from "react"
import DistributionBar from "../_distribution_bar.jsx"

function DistributionBarDefault() {
  return (
    <React.Fragment>
      <div>
        <DistributionBar
          values={[1,2,3,4,5,3,3,7]}
        />
      </div>
      <br/>
      <br/>
      <div>
        <DistributionBar
          size='sm'
          values={[1,2,3,4,5,3,3,7]}
        />
      </div>
    </React.Fragment>
  )
}

export default DistributionBarDefault;
