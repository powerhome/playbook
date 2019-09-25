import React from "react"
import Badge from "../_badge.jsx"

function BadgeDefault() {
  return (
    <div>
      <div>
        <Badge text={"+1"} variant="primary" />
        &nbsp;
      <Badge text={"+1000"} variant="primary" rectangle={true} />
      </div>
      <div>
        <Badge text={"+1"} variant="success" />
        &nbsp;
      <Badge text={"+1000"} variant="success" rectangle={true} />
      </div>
      <div>
        <Badge text={"+1"} variant="warning" />
        &nbsp;
      <Badge text={"+1000"} variant="warning" rectangle={true} />
      </div>
      <div>
        <Badge text={"+1"} variant="error" />
        &nbsp;
      <Badge text={"+1000"} variant="error" rectangle={true} />
      </div>
      <div>
        <Badge text={"+1"} variant="info" />
        &nbsp;
      <Badge text={"+1000"} variant="info" rectangle={true} />
      </div>
      <div>
        <Badge text={"+1"} variant="neutral" />
        &nbsp;
      <Badge text={"+1000"} variant="neutral" rectangle={true} />
      </div>
    </div>
  )
}

export default BadgeDefault;
