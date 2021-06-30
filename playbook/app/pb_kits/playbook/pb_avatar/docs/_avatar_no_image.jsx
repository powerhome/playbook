import React from 'react'
import { Avatar } from '../../'

const AvatarNoImage = (props) => {
  return (
    <div>
      <Avatar
          imageUrl="Just some text here"
          name="Terry Johnson"
          size="xxs"
          {...props}
      />
      <Avatar
          imageUrl="Just some text here"
          name="Terry Johnson"
          size="xs"
          {...props}
      />
      <Avatar
          imageUrl={4}
          name="Terry Johnson"
          size="sm"
          {...props}
      />
      <Avatar
          imageUrl="https://google.com"
          name="Terry Johnson"
          size="md"
          {...props}
      />
      <Avatar
          imageUrl=""
          name="Terry Johnson"
          size="lg"
          {...props}
      />
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/notapicture.jpg"
          name="Terry Johnson"
          size="xl"
          {...props}
      />
    </div>
  )
}

export default AvatarNoImage
