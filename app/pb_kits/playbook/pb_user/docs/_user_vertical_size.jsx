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
          avatar_url='https://randomuser.me/api/portraits/women/44.jpg'
      />
      <br/><br/>
      <User
          name='Anna Black'
          title='Remodeling Consultant'
          orientation='vertical'
          align='center'
          size='md'
          avatar_url='https://randomuser.me/api/portraits/women/44.jpg'
      />
      <br/><br/>
      <User
          name='Anna Black'
          title='Remodeling Consultant'
          orientation='vertical'
          align='center'
          size='lg'
          avatar_url='https://randomuser.me/api/portraits/women/44.jpg'
      />
    </div> 
  )
}

export default UserVerticalSize;
