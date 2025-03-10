import React from 'react'
import CircleIconButton from "../../pb_circle_icon_button/_circle_icon_button"

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
