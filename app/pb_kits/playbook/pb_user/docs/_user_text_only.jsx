import React from 'react'
import { User } from '../../'

const UserTextOnly = () => (
  <div className="pb--doc-demo-row">
    <User
        align='center'
        name='Anna Black'
        orientation='horizontal'
        size='lg'
        title='Remodeling Consultant'
    />
    <User
        align='left'
        name='Anna Black'
        orientation='horizontal'
        title='Remodeling Consultant'
    />
  </div>
)

export default UserTextOnly
