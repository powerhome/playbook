import React from "react"
import Badge from "../_badge.jsx"

function BadgeRounded() {
  return (
    <div>
      <Badge text="+1" variant="primary" rounded />

      &nbsp;

      <Badge text="+4" variant="primary" rounded />

      &nbsp;

      <Badge text="+1000" variant="primary" rounded />
    </div>
  )
}

export default BadgeRounded;
