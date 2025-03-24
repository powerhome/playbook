import React from 'react'
import IconButton from '../../pb_icon_button/_icon_button'

const IconButtonClick = (props) => (
  <div>
    <IconButton
        {...props}
        onClick={() => alert('Click!')}
    />
  </div>
)

export default IconButtonClick
