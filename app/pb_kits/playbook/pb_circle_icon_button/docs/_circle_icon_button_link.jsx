import React from 'react'
import { CircleIconButton } from '../../'

const CircleIconButtonLink = (props) => (
  <div>
    <CircleIconButton
        {...props}
        icon="search"
        link="https://google.com"
        variant="primary"

    />

    <br />

    <CircleIconButton
        {...props}
        icon="window"
        link="https://google.com"
        newWindow
        variant="secondary"
    />

  </div>
)

export default CircleIconButtonLink
