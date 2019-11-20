import React from "react"
import {User} from "../../"

function UserVerticalSize() {
  return (
    <div>
      <User
          name='Anna Black'
          title='Remodeling Consultant'
          orientation='vertical'
          align='center'
          size='sm'
          avatarUrl='https://randomuser.me/api/portraits/women/44.jpg'
      />
      <br/><br/>
      <User
          name='Anna Black'
          title='Remodeling Consultant'
          orientation='vertical'
          align='center'
          size='md'
          avatarUrl='https://randomuser.me/api/portraits/women/44.jpg'
      />
      <br/><br/>
      <User
          name='Anna Black'
          title='Remodeling Consultant'
          orientation='vertical'
          align='center'
          size='lg'
          avatarUrl='https://randomuser.me/api/portraits/women/44.jpg'
      />
    </div> 
  )
}

export default UserVerticalSize;
