import React from "react"
import {User} from "../../"

function UserDefault() {
  return (
    <div class="pb--doc-demo-row">
      <User
          name='Anna Black'
          title='Remodeling Consultant'
          size='sm'
          avatar_url="https://randomuser.me/api/portraits/women/44.jpg"
      />

      <User
          name='Anna Black'
          title='Remodeling Consultant'
          size='md'
          avatar_url="https://randomuser.me/api/portraits/women/44.jpg"
      />

      <User
          name='Anna Black'
          title='Remodeling Consultant'
          size='lg'
          avatar_url="https://randomuser.me/api/portraits/women/44.jpg"
      />
    </div> 
  )
}

export default UserDefault;
