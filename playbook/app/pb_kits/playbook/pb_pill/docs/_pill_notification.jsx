import React from 'react'
import Pill from '../_pill'

const PillNotification = (props) => {
  return (
    <>
      <div>
        <Pill
            notification
            text="1"
            variant="primary"
            {...props}
        />

        <Pill
            notification
            text="4"
            variant="primary"
            {...props}
        />
      </div>

      <div>
        <Pill
            notification
            text="1"
            variant="error"
            {...props}
        />

        <Pill
            notification
            text="4"
            variant="error"
            {...props}
        />
      </div>

      <div>
        <Pill
            notification
            text="success"
            variant="success"
            {...props}
        />

        <Pill
            notification
            text="warning"
            variant="warning"
            {...props}
        />

        <Pill
            notification
            text="info"
            variant="info"
            {...props}
        />

        <Pill
            notification
            text="neutral"
            variant="neutral"
            {...props}
        />
      </div>

      <div>
        <Pill
            notification
            size="sm"
            text="1"
            variant="primary"
            {...props}
        />

        <Pill
            notification
            size="sm"
            text="4"
            variant="error"
            {...props}
        />

        <Pill
            notification
            size="sm"
            text="success"
            variant="success"
            {...props}
        />
      </div>
    </>
  )
}

export default PillNotification
