import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonOnClickDark = () => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        dark
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        linkUrl="https://www.google.com"
        name="Sophia Carden"
        onClick={() => alert('clicked!')}
    />
  </div>
)

export default AvatarActionButtonOnClickDark
