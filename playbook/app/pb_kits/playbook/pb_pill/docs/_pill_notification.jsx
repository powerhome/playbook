import React from 'react'
import Pill from '../_pill'

const PillNotification = (props) => {
  return (
    <>
      <div>
        <Pill
            notification
            text="1"
            {...props}
        />

        &nbsp;

        <Pill
            notification
            text="4"
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

        &nbsp;

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
            size="sm"
            text="1"
            {...props}
        />

        &nbsp;

        <Pill
            notification
            size="sm"
            text="4"
            variant="error"
            {...props}
        />
      </div>
    </>
  )
}

export default PillNotification
