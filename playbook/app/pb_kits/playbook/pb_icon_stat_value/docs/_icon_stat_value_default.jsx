import React from 'react'
import { IconStatValue } from 'playbook-ui'

const IconStatValueDefault = (props) => {
  return (
    <div>
      <IconStatValue
          icon="lightbulb-on"
          text="Electric"
          unit="kw"
          value={64.18}
          {...props}
      />
      <br />
      <IconStatValue
          icon="calendar"
          text="deadline"
          unit="days"
          value={24}
          {...props}
      />
    </div>

  )
}

export default IconStatValueDefault
