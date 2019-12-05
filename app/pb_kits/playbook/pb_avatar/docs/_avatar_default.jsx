import React from "react"
import { Avatar } from "../../"

function AvatarDefault() {
  return (
    <div>
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="xs"
          status="online"
      />
      <br/>
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="sm"
          status="online"
      />
      <br/>
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="md"
          status="away"
      />
      <br/>
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="lg"
          status="offline"
      />
      <br/>
      <Avatar
          imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
          name="Terry Johnson"
          size="xl"
          status="offline"
      />
    </div>
  )
}

export default AvatarDefault
