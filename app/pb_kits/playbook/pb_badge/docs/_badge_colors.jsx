import React from 'react'
import Badge from '../_badge.jsx'

const BadgeColors = () => {
  return (
    <div>
      <div>
        <Badge
            rounded
            text="+1"
            variant="primary"
        />

        &nbsp;

        <Badge
            text="+4"
            variant="primary"
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="primary"
        />
      </div>

      <div>
        <Badge
            rounded
            text="+1"
            variant="success"
        />

        &nbsp;

        <Badge
            text="+4"
            variant="success"
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="success"
        />
      </div>

      <div>
        <Badge
            rounded
            text="+1"
            variant="warning"
        />

        &nbsp;

        <Badge
            text="+4"
            variant="warning"
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="warning"
        />
      </div>

      <div>
        <Badge
            rounded
            text="+1"
            variant="error"
        />

        &nbsp;

        <Badge
            text="+4"
            variant="error"
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="error"
        />
      </div>

      <div>
        <Badge
            rounded
            text="+1"
            variant="info"
        />

        &nbsp;

        <Badge
            text="+4"
            variant="info"
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="info"
        />
      </div>

      <div>
        <Badge
            rounded
            text="+1"
            variant="neutral"
        />

        &nbsp;

        <Badge
            text="+4"
            variant="neutral"
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="neutral"
        />
      </div>
    </div>
  )
}

export default BadgeColors
