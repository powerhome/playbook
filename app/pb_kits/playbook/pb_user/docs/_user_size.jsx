import React from 'react'
import { User } from '../../'

const UserDefault = () => {
  return (
    <div className="pb--doc-demo-row">
      <User
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name='Anna Black'
          size='sm'
          title='Remodeling Consultant'
      />

      <User
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name='Anna Black'
          size='md'
          title='Remodeling Consultant'
      />

      <User
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name='Anna Black'
          size='lg'
          title='Remodeling Consultant'
      />
    </div>
  )
}

export default UserDefault
