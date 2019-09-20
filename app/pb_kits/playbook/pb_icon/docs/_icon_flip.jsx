import React from "react"
import Icon from "../_icon.jsx"

function IconFlip() {
  return (
    <div>
      <Icon icon="question-circle" flip="horizontal" size="2x" fixedWidth />
      <Icon icon="question-circle" flip="vertical" size="2x" fixedWidth />
      <Icon icon="question-circle" flip="both" size="2x" fixedWidth />
    </div>
  )
}

export default IconFlip;
