import React from "react"

import Icon from "../_icon"
import {Caption} from "../.."

const IconDefault = (props) => {
  return (
    <div>
      <Icon fixedWidth
          icon='angles-down'
          {...props}
      />
      <Icon fixedWidth
          icon='circle-arrow-right'
          {...props}
      />
      <Icon fixedWidth
          icon='arrow-circle-right'
          {...props}
      />
      <Caption
          marginY='md'
          text='Font Awesome (no alias & not in our Playbook-icons lib)'
      />
      <Icon fixedWidth
          icon='elephant'
          {...props}
      />
    </div>
  )
}

export default IconDefault
