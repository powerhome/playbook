import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonPlacement = () => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        placement="bottom_left"
    />
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        placement="bottom_right"
    />
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        placement="top_left"
    />
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        placement="top_right"
    />
  </div>
)

export default AvatarActionButtonPlacement
