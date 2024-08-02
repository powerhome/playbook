import React from 'react'
import { Button } from 'playbook-ui'

const ButtonFullWidth = (props) => (
  <div>
    <Button
        fullWidth
        tabIndex={0}
        text="Button Full Width"
        {...props}
    />
  </div>
)

export default ButtonFullWidth
