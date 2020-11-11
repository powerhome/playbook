import React from 'react'
import { Avatar } from '../../'

const AvatarStatus = (props) => {
  return (
    <>
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          {...props}
      />

      <br />

      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          status="online"
          {...props}
      />

      <br />

      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          status="away"
          {...props}
      />

      <br />

      <Avatar
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
