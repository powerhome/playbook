import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonActions = (props) => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        action="add"
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        {...props}
    />
    <AvatarActionButton
        action="remove"
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        {...props}
    />
  </div>
)

export default AvatarActionButtonActions
