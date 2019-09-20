import React from "react"
import Icon from "../_icon.jsx"

function IconAnimate() {
  return (
    <div>
      <p><Icon icon="spinner" size="2x" spin fixedWidth /> <span>Spin</span></p>
      <br/>
      <p><Icon icon="spinner" size="2x" pulse fixedWidth /> <span>Pulse</span></p>
    </div>
  )
}

export default IconAnimate;
