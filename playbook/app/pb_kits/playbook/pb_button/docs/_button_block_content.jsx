import React from 'react'
import { Button } from '../../'

const ButtonBlockContent = (props) => (
  <div>
    <Button
        {...props}
        fixedWidth
        icon="users"
        text="Button with Block Content"
    />
  </div>
)

export default ButtonBlockContent
