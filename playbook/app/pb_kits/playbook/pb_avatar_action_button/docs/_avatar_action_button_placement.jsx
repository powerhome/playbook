import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonPlacement = (props) => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        placement="bottom_left"
        {...props}
    />
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        placement="bottom_right"
        {...props}
    />
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        placement="top_left"
        {...props}
    />
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        placement="top_right"
        {...props}
    />
  </div>
)

export default AvatarActionButtonPlacement
