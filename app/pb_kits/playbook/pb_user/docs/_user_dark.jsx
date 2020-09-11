import React from 'react'
import { User } from '../../'

const UserDark = () => {
  return (
    <div className="pb--doc-demo-row">

      <div>
        <User
            align="center"
            avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
            dark
            name="Anna Black"
            orientation="vertical"
            size="lg"
            title="Remodeling Consultant"
        />
      </div>

      <div>
        <User
            align="left"
            avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
            dark
            name="Anna Black"
            orientation="horizontal"
            title="Remodeling Consultant"
        />
      </div>

      <div>
        <User
            align="left"
            avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
            dark
            name="Anna Black"
            orientation="horizontal"
        />

        <br />

        <User
            align="left"
            avatar
            dark
            name="Anna Black"
            orientation="horizontal"
        />
      </div>

    </div>
  )
}

export default UserDark
