import React from 'react'
import { IconButton } from 'playbook-ui'

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
