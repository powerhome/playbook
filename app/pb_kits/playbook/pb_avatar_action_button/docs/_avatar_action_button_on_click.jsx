import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonOnClick = () => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        linkUrl="https://www.google.com"
        name="Sophia Carden"
        onClick={() => alert('clicked!')}
    />
  </div>
)

export default AvatarActionButtonOnClick
