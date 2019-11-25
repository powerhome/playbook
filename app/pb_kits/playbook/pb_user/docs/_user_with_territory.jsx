import React from "react"
import {User} from "../../"

function UserWithTerritory() {
  return (
    <div class="pb--doc-demo-row">

      <div>
        <User
          name='Anna Black'
          territory='PHL'
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
          territory='PHL'
          title='Remodeling Consultant'
          orientation="horizontal"
          align="left"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
        />
      </div>

      <div>
        <User
          name='Anna Black'
          territory='PHL'
          title='Remodeling Consultant'
          orientation='horizontal'
          align='center'
          size='sm'
        />

        <br/>

        <User
          name='Anna Black'
          territory='PHL'
          title='Remodeling Consultant'
          orientation='horizontal'
          align='left'
          size='lg'
        />
      </div>

    </div>
  )
}

export default UserWithTerritory;
