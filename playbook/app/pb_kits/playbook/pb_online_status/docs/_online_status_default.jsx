import React from 'react'

import OnlineStatus from '../_online_status'

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
