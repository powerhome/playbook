import React from "react"
import Avatar from "../_avatar.jsx"

function AvatarDefault() {
  return (
    <div>
      <Avatar name="Terry Johnson" size="xs" url="https://randomuser.me/api/portraits/men/44.jpg" />
      <Avatar name="Terry Johnson" size="sm" url="https://randomuser.me/api/portraits/men/44.jpg" />
      <Avatar name="Terry Johnson" size="md" url="https://randomuser.me/api/portraits/men/44.jpg" />
      <Avatar name="Terry Johnson" size="lg" url="https://randomuser.me/api/portraits/men/44.jpg" />
      <Avatar name="Terry Johnson" size="xl" url="https://randomuser.me/api/portraits/men/44.jpg" />
    </div>
  )
}

export default AvatarDefault;
