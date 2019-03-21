import React from "react"
import Avatar from "../_avatar.jsx"

function AvatarDefault() {
  return (
    <div>
      <Avatar size="xs" url="https://randomuser.me/api/portraits/men/44.jpg" />
      <Avatar size="sm" url="https://randomuser.me/api/portraits/men/44.jpg" />
      <Avatar size="md" url="https://randomuser.me/api/portraits/men/44.jpg" />
      <Avatar size="lg" url="https://randomuser.me/api/portraits/men/44.jpg" />
      <Avatar size="xl" url="https://randomuser.me/api/portraits/men/44.jpg" />
    </div>
  )
}

export default AvatarDefault;
