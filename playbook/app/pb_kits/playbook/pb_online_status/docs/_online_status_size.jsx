import React from 'react'

import OnlineStatus from '../_online_status'

const OnlineStatusSize = (props) => (
  <>
    <OnlineStatus
        marginY="xs"
        size="sm"
        {...props}
    />
    <OnlineStatus
        marginY="xs"
        size="md"
        {...props}
    />
    <OnlineStatus
        marginY="xs"
        size="lg"
        {...props}
    />
  </>
)

export default OnlineStatusSize
