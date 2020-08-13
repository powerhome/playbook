import React from 'react'
import { OnlineStatus } from '../../'

const OnlineStatusDark = () => (
  <>
    <OnlineStatus
        dark
        status="offline"
    />

    <br />

    <OnlineStatus
        dark
        status="online"
    />

    <br />

    <OnlineStatus
        dark
        status="away"
    />

  </>
)

export default OnlineStatusDark
