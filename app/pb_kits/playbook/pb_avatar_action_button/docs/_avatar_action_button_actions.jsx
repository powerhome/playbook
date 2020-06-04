import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonActions = () => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        action="add"
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
    />
    <AvatarActionButton
        action="remove"
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
    />
  </div>
)

export default AvatarActionButtonActions
