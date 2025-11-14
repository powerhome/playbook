import React from 'react'
import User from '../../pb_user/_user'

const UserFontOptions = (props) => {
  return (
    <div>
      <div className="pb--doc-demo-row">
        <div>
          <User
              align="center"
              avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
              name="Anna Black"
              nameStyle= "body"
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
              nameStyle= "detail"
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

export default UserFontOptions
