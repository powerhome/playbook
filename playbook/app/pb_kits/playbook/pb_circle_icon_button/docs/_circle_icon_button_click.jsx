import React from 'react'
import { CircleIconButton } from '../..'

const CircleIconButtonClick = (props) => (
  <div>
    <CircleIconButton
        icon="plus"
        onClick={() => alert('Click!')}
        variant="primary"
        {...props}
    />
  </div>
)

export default CircleIconButtonClick
