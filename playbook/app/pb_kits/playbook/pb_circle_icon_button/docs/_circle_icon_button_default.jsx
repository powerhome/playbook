import React from 'react'
import { CircleIconButton } from '../../'

const CircleIconButtonDefault = (props) => (
  <div>
    <CircleIconButton
        buttonData={{ testid: 'button-test' }}
        data={{ testid: 'circleiconbutton-test' }}
        icon="plus"
        variant="primary"
        {...props}
    />

    <br />

    <CircleIconButton
        icon="pen"
        variant="secondary"
        {...props}
    />

    <br />

    <CircleIconButton
        disabled
        icon="times"
        {...props}
    />

    <br />

    <CircleIconButton
        icon="user"
        variant="link"
        {...props}
    />
  </div>
)

export default CircleIconButtonDefault
