import React from 'react'

import CircleIconButton from '../_circle_icon_button'

const CircleIconButtonDisabled = (props) => (
  <div>
    <CircleIconButton
        disabled
        icon="plus"
        variant="primary"
        {...props}
    />

    <br />

    <CircleIconButton
        disabled
        icon="pen"
        variant="secondary"
        {...props}
    />

    <br />

    <CircleIconButton
        disabled
        icon="user"
        variant="link"
        {...props}
    />
  </div>
)

export default CircleIconButtonDisabled
