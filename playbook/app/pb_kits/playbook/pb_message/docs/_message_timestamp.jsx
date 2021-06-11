import React from 'react'
import { Message } from '../../'

const MessageTimestamp = (props) => {
  return (
    <>
      <Message
          avatarName="Wade Winningham"
          avatarUrl="https://randomuser.me/api/portraits/men/14.jpg"
          label="Anna Black"
          message="We will escalate this issue to a Senior Support agent."
          timestamp="9 minutes ago"
          timestampObject={new Date}
          {...props}
      />
      <br />
      <br />
      <Message
          alignTimestamp="left"
          avatarName="Wade Winningham"
          avatarUrl="https://randomuser.me/api/portraits/men/14.jpg"
          label="Becca Jacobs"
          message="Application for Kate Smith is waiting for your approval"
          timestamp="12.20p"
          timestampObject={new Date}
          {...props}
      />
    </>
  )
}

export default MessageTimestamp
