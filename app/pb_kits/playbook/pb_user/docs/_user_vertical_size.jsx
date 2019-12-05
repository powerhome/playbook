import React from "react"
import { User } from "../../"

function UserVerticalSize() {
  return (
    <div>
      <User
          align='center'
          avatarUrl='https://randomuser.me/api/portraits/women/44.jpg'
          name='Anna Black'
          orientation='vertical'
          size='sm'
          title='Remodeling Consultant'
      />
      <br /><br />
      <User
          align='center'
          avatarUrl='https://randomuser.me/api/portraits/women/44.jpg'
          name='Anna Black'
          orientation='vertical'
          size='md'
          title='Remodeling Consultant'
      />
      <br /><br />
      <User
          align='center'
          avatarUrl='https://randomuser.me/api/portraits/women/44.jpg'
          name='Anna Black'
          orientation='vertical'
          size='lg'
          title='Remodeling Consultant'
      />
    </div>
  )
}

export default UserVerticalSize
