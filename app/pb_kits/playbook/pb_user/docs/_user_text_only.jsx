import React from "react"
import {User} from "../../"

function UserTextOnly() {
  return (
    <div class="pb--doc-demo-row">
      <User
          name='Anna Black'
          title='Remodeling Consultant'
          orientation='horizontal'
          align='center'
          size='lg'
      />
      <User
          name='Anna Black'
          title='Remodeling Consultant'
          orientation='horizontal'
          align='left'
      />
    </div> 
  )
}

export default UserTextOnly;
