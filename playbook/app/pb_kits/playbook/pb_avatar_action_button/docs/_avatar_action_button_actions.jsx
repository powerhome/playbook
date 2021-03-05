import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonActions = (props) => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        action="add"
        imageAlt="Add Sophia Carden"
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        linkAriaLabel="Add Sophia Carden"
        name="Sophia Carden"
        {...props}
    />
    <AvatarActionButton
        action="remove"
        imageAlt="Remove Sophia Carden"
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        linkAriaLabel="Remove Sophia Carden"
        name="Sophia Carden"
        {...props}
    />
  </div>
)

export default AvatarActionButtonActions
