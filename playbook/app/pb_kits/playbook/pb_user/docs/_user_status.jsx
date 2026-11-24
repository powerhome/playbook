import React from 'react'
import User from '../../pb_user/_user'

const UserStatus = (props) => {
  return (
    <>
      <User
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          status="online"
          title="Remodeling Consultant"
          {...props}
      />

      <br />

      <User
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          status="away"
          title="Remodeling Consultant"
          {...props}
      />

      <br />

      <User
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          status="offline"
          title="Remodeling Consultant"
          {...props}
      />
    </>
  )
}

export default UserStatus
