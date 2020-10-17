import React from 'react'
import { CircleIconButton } from '../..'

const CircleIconButtonClick = (props) => (
  <div>
    <CircleIconButton
        {...props}
        icon="plus"
        onClick={() => alert('Click!')}
        variant="primary"
    />
  </div>
)

export default CircleIconButtonClick
