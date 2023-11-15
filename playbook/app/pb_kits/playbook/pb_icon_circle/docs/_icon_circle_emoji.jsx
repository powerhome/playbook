import React from "react"

import IconCircle from "../_icon_circle"

const IconCircleEmoji = props => {
  return (
    <div>
      <IconCircle icon="😁" size="sm" {...props} />
      <br />
      <IconCircle icon="&#128525;" size="md" variant="red" {...props} />
      <br />
      <IconCircle icon="&#x1F389;" size="lg" variant="teal" {...props} />
    </div>
  )
}

export default IconCircleEmoji
