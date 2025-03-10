import React from 'react'
import User from '../../pb_user/_user'

const UserVerticalSize = (props) => {
  return (
    <div>
      <User
          align="center"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          orientation="vertical"
          size="sm"
          title="Remodeling Consultant"
          {...props}
      />
      <br />
      <br />
      <User
          align="center"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          orientation="vertical"
          size="md"
          title="Remodeling Consultant"
          {...props}
      />
      <br />
      <br />
      <User
          align="center"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          orientation="vertical"
          size="lg"
          title="Remodeling Consultant"
          {...props}
      />
    </div>
  )
}

export default UserVerticalSize
