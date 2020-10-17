import React from 'react'
import { Avatar } from '../../'

const AvatarDefault = (props) => {
  return (
    <div>
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="xs"
          status="online"
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
          size="md"
          status="away"
          {...props}
      />
      <br />
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="lg"
          status="offline"
          {...props}
      />
      <br />
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="xl"
          status="offline"
          {...props}
      />
    </div>
  )
}

export default AvatarDefault
