import React from 'react'
import { Avatar } from '../../'

const AvatarStatus = () => {
  return (
    <>
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
      />

      <br />

      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          status="online"
      />

      <br />

      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          status="away"
      />

      <br />

      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          status="offline"
      />

      <br />
    </>
  )
}

export default AvatarStatus
