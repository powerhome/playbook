import React from 'react'
import { Button } from '../../'

const ButtonFullWidth = (props) => (
  <div>
    <Button
        {...props}
        fullWidth
        text="Button Full Width"
    />
  </div>
)

export default ButtonFullWidth
