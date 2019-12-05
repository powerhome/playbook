import React from 'react'
import { User } from '../../'

const UserWithTerritory = () => (
  <div className="pb--doc-demo-row">
    <div>
      <User
          align="center"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name='Anna Black'
          orientation="vertical"
          size='lg'
          territory='PHL'
          title='Remodeling Consultant'
      />
    </div>

    <div>
      <User
          align="left"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name='Anna Black'
          orientation="horizontal"
          territory='PHL'
          title='Remodeling Consultant'
      />
    </div>

    <div>
      <User
          align='center'
          name='Anna Black'
          orientation='horizontal'
          size='sm'
          territory='PHL'
          title='Remodeling Consultant'
      />

      <br />

      <User
          align='left'
          name='Anna Black'
          orientation='horizontal'
          size='lg'
          territory='PHL'
          title='Remodeling Consultant'
      />
    </div>
  </div>
)

export default UserWithTerritory
