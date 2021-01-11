import React from 'react'
import { Button } from '../../'

const ButtonBlockContent = (props) => (
  <div>
    <Button
        fixedWidth
        icon="users"
        text="Button with Block Content"
        {...props}
    />
  </div>
)

export default ButtonBlockContent
