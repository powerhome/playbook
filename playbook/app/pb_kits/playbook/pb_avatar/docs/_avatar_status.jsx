import React from 'react'
import { Avatar } from 'playbook-ui'

const AvatarStatus = (props) => {
  return (
    <>
      <Avatar
          imageAlt="Terry Johnson Status"
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          {...props}
      />

      <br />

      <Avatar
          imageAlt="Terry Johnson Online"
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          status="online"
          {...props}
      />

      <br />

      <Avatar
          imageAlt="Terry Johnson Away"
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          status="away"
          {...props}
      />

      <br />

      <Avatar
          imageAlt="Terry Johnson Offline"
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          status="offline"
          {...props}
      />

      <br />
    </>
  )
}

export default AvatarStatus
