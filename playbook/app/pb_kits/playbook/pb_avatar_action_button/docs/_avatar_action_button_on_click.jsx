import React from 'react'

import AvatarActionButton from '../_avatar_action_button'

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
