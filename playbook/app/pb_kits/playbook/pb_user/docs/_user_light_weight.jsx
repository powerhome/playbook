import React from 'react'
import User from '../../pb_user/_user'

const UserLightWeight = (props) => {
  return (
    <div className="pb--doc-demo-row">

      <div>
        <User
            align="center"
            avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
            bold={false}
            name="Anna Black"
            orientation="vertical"
            size="lg"
            title="Remodeling Consultant"
            {...props}
        />
      </div>

      <div>
        <User
            align="left"
            avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
            bold={false}
            name="Anna Black"
            orientation="horizontal"
            title="Remodeling Consultant"
            {...props}
        />
      </div>

      <div>
        <User
            align="left"
            avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
            bold={false}
            name="Anna Black"
            orientation="horizontal"
            {...props}
        />

        <br />

        <User
            align="left"
            avatar
            bold={false}
            name="Anna Black"
            orientation="horizontal"
            {...props}
        />
      </div>

    </div>
  )
}

export default UserLightWeight
