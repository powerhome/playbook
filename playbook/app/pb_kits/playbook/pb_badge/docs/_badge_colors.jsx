import React from 'react'
import Badge from '../_badge.jsx'

const BadgeColors = (props) => {
  return (
    <div>
      <div>
        <Badge
            rounded
            text="+1"
            variant="primary"
            {...props}
        />

        &nbsp;

        <Badge
            text="+4"
            variant="primary"
            {...props}
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="primary"
            {...props}
        />
      </div>

      <div>
        <Badge
            rounded
            text="+1"
            variant="success"
            {...props}
        />

        &nbsp;

        <Badge
            text="+4"
            variant="success"
            {...props}
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="success"
            {...props}
        />
      </div>

      <div>
        <Badge
            rounded
            text="+1"
            variant="warning"
            {...props}
        />

        &nbsp;

        <Badge
            text="+4"
            variant="warning"
            {...props}
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="warning"
            {...props}
        />
      </div>

      <div>
        <Badge
            rounded
            text="+1"
            variant="error"
            {...props}
        />

        &nbsp;

        <Badge
            text="+4"
            variant="error"
            {...props}
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="error"
            {...props}
        />
      </div>

      <div>
        <Badge
            rounded
            text="+1"
            variant="info"
            {...props}
        />

        &nbsp;

        <Badge
            text="+4"
            variant="info"
            {...props}
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="info"
            {...props}
        />
      </div>

      <div>
        <Badge
            rounded
            text="+1"
            variant="neutral"
            {...props}
        />

        &nbsp;

        <Badge
            text="+4"
            variant="neutral"
            {...props}
        />

        &nbsp;

        <Badge
            text="+1000"
            variant="neutral"
            {...props}
        />
      </div>
    </div>
  )
}

export default BadgeColors
