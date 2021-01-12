import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonDefault = (props) => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        name="Sophia Carden"
        {...props}
    />
  </div>
)

export default AvatarActionButtonDefault
