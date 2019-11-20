import React from "react"
import {User} from "../../"

function UserDefault() {
  return (
    <div class="pb--doc-demo-row">

      <div>
        <User
          name='Anna Black'
          title='Remodeling Consultant'
          orientation="vertical"
          align="center"
          size='lg'
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
        />
      </div>

      <div>
        <User
          name='Anna Black'
          title='Remodeling Consultant'
          orientation="horizontal"
          align="left"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
        />
      </div>

      <div>
        <User
          name='Anna Black'
          orientation="horizontal"
          align="left"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
        />

        <br/>

        <User
          name='Anna Black'
          orientation="horizontal"
          align="left"
          avatar={true}
        />
      </div>

    </div>
  )
}

export default UserDefault;
