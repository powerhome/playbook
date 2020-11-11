import React from 'react'
import { CircleIconButton } from '../../'

const CircleIconButtonDefault = (props) => (
  <div>
    <CircleIconButton
        {...props}
        icon="plus"
        variant="primary"
    />

    <br />

    <CircleIconButton
        {...props}
        icon="pen"
        variant="secondary"
    />

    <br />

    <CircleIconButton
        {...props}
        disabled
        icon="times"
    />

    <br />

    <CircleIconButton
        {...props}
        icon="user"
        variant="link"
    />
  </div>
)

export default CircleIconButtonDefault
