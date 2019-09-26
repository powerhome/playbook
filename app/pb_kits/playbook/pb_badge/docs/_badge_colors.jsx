import React from "react"
import Badge from "../_badge.jsx"

function BadgeColors() {
  return (
    <div>
      <div>
        <Badge text="+1" variant="primary" rounded />

        &nbsp;

        <Badge text="+4" variant="primary" />

        &nbsp;

        <Badge text="+1000" variant="primary" />
      </div>

      <div>
        <Badge text="+1" variant="success" rounded />

        &nbsp;

        <Badge text="+4" variant="success" />

        &nbsp;

        <Badge text="+1000" variant="success" />
      </div>

      <div>
        <Badge text="+1" variant="warning" rounded />

        &nbsp;

        <Badge text="+4" variant="warning" />

        &nbsp;

        <Badge text="+1000" variant="warning" />
      </div>

      <div>
        <Badge text="+1" variant="error" rounded />

        &nbsp;

        <Badge text="+4" variant="error" />

        &nbsp;

        <Badge text="+1000" variant="error" />
      </div>

      <div>
        <Badge text="+1" variant="info" rounded />

        &nbsp;

        <Badge text="+4" variant="info" />

        &nbsp;

        <Badge text="+1000" variant="info" />
      </div>

      <div>
        <Badge text="+1" variant="neutral" rounded />

        &nbsp;

        <Badge text="+4" variant="neutral" />

        &nbsp;

        <Badge text="+1000" variant="neutral" />
      </div>
    </div>
  )
}

export default BadgeColors;
