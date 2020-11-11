import React from 'react'
import { OnlineStatus } from '../../'

const OnlineStatusDefault = (props) => (
  <>
    <OnlineStatus
        status="offline"
        {...props}
    />

    <br />

    <OnlineStatus
        status="online"
        {...props}
    />

    <br />

    <OnlineStatus
        status="away"
        {...props}
    />

  </>
)

export default OnlineStatusDefault
