import React from "react"
import {Icon} from "../../"

function IconRotate() {
  return (
    <div>
      <Icon icon="user" rotation={90} size="2x" fixedWidth />
      <Icon icon="user" rotation={180} size="2x" fixedWidth />
      <Icon icon="user" rotation={270} size="2x" fixedWidth />
    </div>
  )
}

export default IconRotate;
