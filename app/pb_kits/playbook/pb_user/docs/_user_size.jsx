import React from "react"
import {User} from "../../"

function UserDefault() {
  return (
    <div class="pb--doc-demo-row">
      <User
          name='Anna Black'
          title='Remodeling Consultant'
          size='sm'
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
      />

      <User
          name='Anna Black'
          title='Remodeling Consultant'
          size='md'
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
      />

      <User
          name='Anna Black'
          title='Remodeling Consultant'
          size='lg'
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
      />
    </div> 
  )
}

export default UserDefault;
