import React from "react"
import {Icon} from "../../"

function IconFlip() {
  return (
    <div>
      <Icon
          fixedWidth
          flip="horizontal"
          icon="question-circle"
          size="2x"
      />
      <Icon
          fixedWidth
          flip="vertical"
          icon="question-circle"
          size="2x"
      />
      <Icon
          fixedWidth
          flip="both"
          icon="question-circle"
          size="2x"
      />
    </div>
  )
}

export default IconFlip
