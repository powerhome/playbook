import React from 'react'

import OnlineStatus from '../_online_status'

const OnlineStatusDefault = (props) => (
  <>
    <OnlineStatus
        marginY="xs"
        status="offline"
        {...props}
    />
    <OnlineStatus
        marginY="xs"
        status="online"
        {...props}
    />
    <OnlineStatus
        marginY="xs"
        status="away"
        {...props}
    />
    <OnlineStatus
        marginY="xs"
        status="error"
        {...props}
    />
    <OnlineStatus
        marginY="xs"
        status="info"
        {...props}
    />
    <OnlineStatus
        marginY="xs"
        status="primary"
        {...props}
    />
  </>
)

export default OnlineStatusDefault
