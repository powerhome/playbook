import React from 'react'
import Button from "../../pb_button/_button"

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
