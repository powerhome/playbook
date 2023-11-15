import React from "react"

import Message from "../_message"

const MessageHover = props => {
  return (
    <div>
      <Message
        avatarName="Mike Bishop"
        avatarStatus="online"
        avatarUrl="https://randomuser.me/api/portraits/men/50.jpg"
        borderRadius="rounded"
        hover={{ background: "success_subtle" }}
        label="Anna Black"
        message="How can we assist you today?"
        padding="xs"
        {...props}
      />

      <br />
      <br />
      <br />

      <Message
        avatarName="Becca Jacobs"
        avatarUrl="https://randomuser.me/api/portraits/women/50.jpg"
        borderRadius="rounded"
        hover={{ shadow: "deepest" }}
        label="Lucille Sanchez"
        message="Application for Kate Smith is waiting for your approval"
        padding="xs"
        {...props}
      />

      <br />
    </div>
  )
}

export default MessageHover
