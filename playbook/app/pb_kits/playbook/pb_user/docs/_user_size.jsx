import React from 'react'
import User from '../../pb_user/_user'

const UserDefault = (props) => {
  return (
    <div className="pb--doc-demo-row">
      <User
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          size="sm"
          title="Remodeling Consultant"
          {...props}
      />

      <User
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          size="md"
          title="Remodeling Consultant"
          {...props}
      />

      <User
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          size="lg"
          title="Remodeling Consultant"
          {...props}
      />
    </div>
  )
}

export default UserDefault
