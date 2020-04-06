import React from 'react'
import { CircleIconButton } from '../..'

const CircleIconButtonClick = () => (
  <div>
    <CircleIconButton
        icon="plus"
        onClick={() => alert('Click!')}
        variant="primary"
    />
  </div>
)

export default CircleIconButtonClick
