import React from "react"
import DistributionBar from "../_distribution_bar.jsx"

function DistributionBarDefault() {
  return (
    <React.Fragment>
      <h4>Large Distribution Bar</h4>
      <div>
        <DistributionBar
          values={[1,2,3,4,5]}
        />
      </div>
      <br/>
      <h4>Small Distribution Bar</h4>
      <div>
        <DistributionBar
          size='sm'
          values={[1,2,3,4,5]}
        />
      </div>
    </React.Fragment>
  )
}

export default DistributionBarDefault;
