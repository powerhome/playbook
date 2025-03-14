import React from 'react'
import { User } from 'playbook-ui'

const UserFontOptionsTitle = (props) => {
  return (
    <div>
      <div className="pb--doc-demo-row">
        <div>
          <User
              align="center"
              avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
              name="Anna Black"
              orientation="horizontal"
              size= "md"
              territory= "PHL"
              title="Remodeling Consultant"
              titleTypeKit= "caption"
              {...props}
          />
        </div>

        <div>
          <User
              align="left"
              avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
              name="Anna Black"
              orientation="horizontal"
              size= "md"
              territory= "PHL"
              title="Remodeling Consultant"
              titleTypeKit= "detail"
              {...props}
          />
        </div>
      </div>

      <div className="pb--doc-demo-row">
        <div>
          <User
              align="center"
              avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
              name="Anna Black"
              orientation="horizontal"
              size= "sm"
              territory= "PHL"
              title="Remodeling Consultant"
              titleTypeKit= "caption"
              {...props}
          />
        </div>

        <div>
          <User
              align="left"
              avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
              name="Anna Black"
              orientation="horizontal"
              size= "md"
              territory= "PHL"
              title="Remodeling Consultant"
              titleTypeKit= "caption"
              {...props}
          />
        </div>

        <div>
          <User
              align="left"
              avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
              name="Anna Black"
              orientation="horizontal"
              size= "lg"
              territory= "PHL"
              title= "Remodeling Consultant"
              titleTypeKit= "caption"
              {...props}
          />
        </div>
      </div>
    </div>
  )
}

export default UserFontOptionsTitle
