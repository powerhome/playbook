import React from 'react'
import { CircleIconButton } from '../../'

const CircleIconButtonLink = () => (
  <div>
    <CircleIconButton
        icon="search"
        link="https://google.com"
        variant="primary"

    />

    <br />

    <CircleIconButton
        icon="window"
        link="https://google.com"
        newWindow
        variant="secondary"
    />

  </div>
)

export default CircleIconButtonLink
