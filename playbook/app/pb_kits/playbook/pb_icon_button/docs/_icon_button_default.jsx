import React from 'react'
import IconButton from '../../pb_icon_button/_icon_button'

const IconButtonDefault = (props) => (
  <div>
    <IconButton
        {...props}
    />
    <IconButton
        {...props}
        marginTop="md"
        variant="link"
    />
  </div>
)

export default IconButtonDefault
