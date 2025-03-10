import React from 'react'
import { default as Avatar } from "../../pb_avatar/_avatar"

const AvatarDefault = (props) => {
  return (
    <div>
      <Avatar
          name="Terry Johnson"
          size="xxs"
          {...props}
      />
      <Avatar
          name="Terry Johnson"
          size="xs"
          {...props}
      />
      <Avatar
          name="Terry Johnson"
          size="sm"
          {...props}
      />
      <Avatar
          name="Terry Johnson"
          size="md"
          {...props}
      />
      <Avatar
          name="Terry Johnson"
          size="lg"
          {...props}
      />
      <Avatar
          name="Terry Johnson"
          size="xl"
          {...props}
      />
    </div>
  )
}

export default AvatarDefault
