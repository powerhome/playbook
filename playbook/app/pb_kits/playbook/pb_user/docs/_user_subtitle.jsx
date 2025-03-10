import React from "react"
import User from '../../pb_user/_user'

const UserSubtitle = (props) => {
  return (
    <div className="pb--doc-demo-row">
      <User
          align="center"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          orientation="vertical"
          size="lg"
          subtitle="User ID: 12345"
          territory="PHL"
          title="Remodeling Consultant"
          {...props}
      />

      <User
          align="left"
          avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
          name="Anna Black"
          orientation="horizontal"
          subtitle="User ID: 12345"
          territory="PHL"
          title="Remodeling Consultant"
          {...props}
      />
    </div>
  )
}

export default UserSubtitle
