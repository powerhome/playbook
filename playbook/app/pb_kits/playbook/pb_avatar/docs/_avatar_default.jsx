import React from 'react'
import Avatar from '../../pb_avatar/_avatar'

const AvatarDefault = (props) => {
  return (
    <div>
      <Avatar
          imageAlt="Terry Johnson Standing"
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="xxs"
          status="online"
          {...props}
      />
      <br />
      <Avatar
          imageAlt="Terry Johnson Standing"
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="xs"
          status="online"
          {...props}
      />
      <br />
      <Avatar
          imageAlt="Terry Johnson Standing"
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          status="online"
          {...props}
      />
      <br />
      <Avatar
          imageAlt="Terry Johnson Standing"
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="md"
          status="away"
          {...props}
      />
      <br />
      <Avatar
          imageAlt="Terry Johnson Standing"
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="lg"
          status="offline"
          {...props}
      />
      <br />
      <Avatar
          imageAlt="Terry Johnson Standing"
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
