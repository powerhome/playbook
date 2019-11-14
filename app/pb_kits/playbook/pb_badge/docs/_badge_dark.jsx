import React from "react"
import Badge from "../_badge.jsx"

function BadgeDark() {
  return (
    <div>
      <div>
        <Badge text="+1" variant="primary" rounded dark />

        &nbsp;

        <Badge text="+4" variant="primary" dark />

        &nbsp;

        <Badge text="+1000" variant="primary" dark />
      </div>

      <div>
        <Badge text="+1" variant="success" rounded dark />

        &nbsp;

        <Badge text="+4" variant="success" dark />

        &nbsp;

        <Badge text="+1000" variant="success" dark />
      </div>

      <div>
        <Badge text="+1" variant="warning" rounded dark />

        &nbsp;

        <Badge text="+4" variant="warning" dark />

        &nbsp;

        <Badge text="+1000" variant="warning" dark />
      </div>

      <div>
        <Badge text="+1" variant="error" rounded dark />

        &nbsp;

        <Badge text="+4" variant="error" dark />

        &nbsp;

        <Badge text="+1000" variant="error" dark />
      </div>

      <div>
        <Badge text="+1" variant="info" rounded dark />

        &nbsp;

        <Badge text="+4" variant="info" dark />

        &nbsp;

        <Badge text="+1000" variant="info" dark />
      </div>

      <div>
        <Badge text="+1" variant="neutral" rounded dark />

        &nbsp;

        <Badge text="+4" variant="neutral" dark />

        &nbsp;

        <Badge text="+1000" variant="neutral" dark />
      </div>
    </div>
  )
}

export default BadgeDark;
