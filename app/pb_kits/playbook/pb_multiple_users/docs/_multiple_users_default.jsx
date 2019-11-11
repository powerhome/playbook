import React from "react"
import { MultipleUsers } from "../../"

function MultipleUsersDefault() {
  return (
    <div>
      <Avatar
          name="Terry Johnson"
          number="1"
          url="https://randomuser.me/api/portraits/men/44.jpg"
      />
      <br/>
      <Avatar
          name="Terry Johnson"
          number="2"
          url="https://randomuser.me/api/portraits/men/44.jpg"
      />
      <br/>
      <Avatar
          name="Terry Johnson"
          number="3"
          url="https://randomuser.me/api/portraits/men/44.jpg"
      />
      <br/>
      <Avatar
          name="Terry Johnson"
          number="4"
          url="https://randomuser.me/api/portraits/men/44.jpg"
      />
      <br/>
    </div>
  )
}

export default MultipleUsersDefault;
