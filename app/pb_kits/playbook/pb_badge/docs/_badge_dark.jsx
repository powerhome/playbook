import React from "react"
import Badge from "../_badge.jsx"

function BadgeDark() {
  return (
    <div>
      <div>
        <Badge
            dark
            rounded
            text="+1"
            variant="primary"
        />

        &nbsp;

        <Badge
            dark
            text="+4"
            variant="primary"
        />

        &nbsp;

        <Badge
            dark
            text="+1000"
            variant="primary"
        />
      </div>

      <div>
        <Badge
            dark
            rounded
            text="+1"
            variant="success"
        />

        &nbsp;

        <Badge
            dark
            text="+4"
            variant="success"
        />

        &nbsp;

        <Badge
            dark
            text="+1000"
            variant="success"
        />
      </div>

      <div>
        <Badge
            dark
            rounded
            text="+1"
            variant="warning"
        />

        &nbsp;

        <Badge
            dark
            text="+4"
            variant="warning"
        />

        &nbsp;

        <Badge
            dark
            text="+1000"
            variant="warning"
        />
      </div>

      <div>
        <Badge
            dark
            rounded
            text="+1"
            variant="error"
        />

        &nbsp;

        <Badge
            dark
            text="+4"
            variant="error"
        />

        &nbsp;

        <Badge
            dark
            text="+1000"
            variant="error"
        />
      </div>

      <div>
        <Badge
            dark
            rounded
            text="+1"
            variant="info"
        />

        &nbsp;

        <Badge
            dark
            text="+4"
            variant="info"
        />

        &nbsp;

        <Badge
            dark
            text="+1000"
            variant="info"
        />
      </div>

      <div>
        <Badge
            dark
            rounded
            text="+1"
            variant="neutral"
        />

        &nbsp;

        <Badge
            dark
            text="+4"
            variant="neutral"
        />

        &nbsp;

        <Badge
            dark
            text="+1000"
            variant="neutral"
        />
      </div>
    </div>
  )
}

export default BadgeDark
