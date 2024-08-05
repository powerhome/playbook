import React from 'react'
import { IconStatValue } from 'playbook-ui'

const IconStatValueVertical = (props) => {
  return (
    <div>
      <IconStatValue
          icon="broadcast-tower"
          orientation="vertical"
          text="Radio"
          unit="wkz"
          value={102.5}
          {...props}
      />
    </div>

  )
}

export default IconStatValueVertical
