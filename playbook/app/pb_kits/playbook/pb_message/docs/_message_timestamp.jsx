import React from 'react'
import { Message } from '../../'

const MessageTimestamp = (props) => {
  return (
    <Message
        avatarName="Wade Winningham"
        avatarUrl="https://randomuser.me/api/portraits/men/14.jpg"
        label="Support"
        message="We will escalate this issue to a Senior Support agent."
        timestamp="9 minutes ago"
        timestampObject={new Date}
        {...props}
    />
  )
}

export default MessageTimestamp
