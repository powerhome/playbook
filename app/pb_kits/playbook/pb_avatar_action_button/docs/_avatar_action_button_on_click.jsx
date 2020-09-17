import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonOnClick = (props) => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        linkUrl="https://www.google.com"
        name="Sophia Carden"
        onClick={() => alert('clicked!')}
        {...props}
    />
  </div>
)

export default AvatarActionButtonOnClick
