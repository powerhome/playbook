import React from "react"
import { Avatar } from "../../"

function AvatarDefault() {
  return (
    <div>
      <Avatar
          name="Terry Johnson"
          size="xs"
          status="online"
          url="https://randomuser.me/api/portraits/men/44.jpg"
      />
      <br/>
      <Avatar
          name="Terry Johnson"
          size="sm"
          status="online"
          url="https://randomuser.me/api/portraits/men/44.jpg"
      />
      <br/>
      <Avatar
          name="Terry Johnson"
          size="md"
          status="away"
          url="https://randomuser.me/api/portraits/men/44.jpg"
      />
      <br/>
      <Avatar
          name="Terry Johnson"
          size="lg"
          status="offline"
          url="https://randomuser.me/api/portraits/men/44.jpg"
      />
      <br/>
      <Avatar
          name="Terry Johnson"
          size="xl"
          status="offline"
          url="https://randomuser.me/api/portraits/men/44.jpg"
      />
    </div>
  )
}

export default AvatarDefault;
