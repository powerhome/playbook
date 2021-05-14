import React from 'react'

import AvatarActionButton from '../_avatar_action_button'

const AvatarActionButtonDefault = (props) => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        imageAlt="Sophia Carden"
        imageUrl="https://randomuser.me/api/portraits/women/8.jpg"
        linkAriaLabel="Sophia Carden"
        name="Sophia Carden"
        {...props}
    />
  </div>
)

export default AvatarActionButtonDefault
