import React from 'react'
import { OnlineStatus } from '../../'

const OnlineStatusDefault = () => (
  <>
    <OnlineStatus status="offline" />

    <br />

    <OnlineStatus status="online" />

    <br />

    <OnlineStatus status="away" />

  </>
)

export default OnlineStatusDefault
