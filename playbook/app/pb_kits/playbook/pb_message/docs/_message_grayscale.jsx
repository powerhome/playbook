import React from "react"

import Message from "../_message"

const MessageGrayscale = (props) => {
  return (
    <Message
        avatarName='Mike Bishop'
        avatarStatus='offline'
        avatarUrl='https://randomuser.me/api/portraits/men/50.jpg'
        borderRadius='rounded'
        grayscale
        label='Mike Bishop'
        message='So long, and thanks for all the fish!'
        timestamp='3 months ago'
        {...props}
    />
  )
}

export default MessageGrayscale
