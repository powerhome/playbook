import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonOnClick = (props) => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        imageAlt="Sophia Carden"
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        linkAriaLabel="Alert Sophia Carden"
        linkUrl="https://www.google.com"
        name="Sophia Carden"
        onClick={() => alert('clicked!')}
        {...props}
    />
  </div>
)

export default AvatarActionButtonOnClick
