import React from 'react'
import { User } from 'playbook-ui'

const UserFontOptionsName = (props) => {
  return (
    <div>
      <div className="pb--doc-demo-row">
        <div>
          <User
              align="center"
              avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
              name="Anna Black"
              nameTypeKit= "body"
              orientation="horizontal"
              size= "md"
              territory= "PHL"
              title="Remodeling Consultant"
              {...props}
          />
        </div>

        <div>
          <User
              align="left"
              avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
              name="Anna Black"
              nameTypeKit= "detail"
              orientation="horizontal"
              size= "md"
              territory= "PHL"
              title= "Remodeling Consultant"
              {...props}
          />
        </div>
      </div>
    </div>
  )
}

export default UserFontOptionsName
