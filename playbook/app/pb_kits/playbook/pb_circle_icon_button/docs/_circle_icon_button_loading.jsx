import React from 'react'

import CircleIconButton from '../_circle_icon_button'

const CircleIconButtonLoading = (props) => (
  <div>
    <CircleIconButton
        icon="plus"
        loading
        variant="primary"
        {...props}
    />

    <br />

    <CircleIconButton
        icon="pen"
        loading
        variant="secondary"
        {...props}
    />

    <br />

    <CircleIconButton
        disabled
        icon="times"
        loading
        {...props}
    />

    <br />

    <CircleIconButton
        icon="user"
        loading
        variant="link"
        {...props}
    />
  </div>
)

export default CircleIconButtonLoading
