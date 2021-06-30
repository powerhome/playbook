import React from 'react'

import CircleIconButton from '../_circle_icon_button'

const CircleIconButtonLink = (props) => (
  <div>
    <CircleIconButton
        icon="search"
        link="https://google.com"
        variant="primary"
        {...props}
    />

    <br />

    <CircleIconButton
        icon="window"
        link="https://google.com"
        newWindow
        variant="secondary"
        {...props}
    />

  </div>
)

export default CircleIconButtonLink
