import React from 'react'
import { Legend } from 'playbook-ui'

const LegendPrefix = (props) => (
  <div>
    <Legend
        color="data_3"
        prefixText="10"
        text="Windows"
        {...props}
    />
  </div>
)

export default LegendPrefix
