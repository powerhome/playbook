import React from 'react'
import { Button } from '../../'

const ButtonSize = (props) => (
  <div>
    <Button
        size="sm"
        text="Button sm size"
        {...props}
    />
    <Button
        size="md"
        text="Button md size"
        {...props}
    />
    <Button
        size="lg"
        text="Button lg size"
        {...props}
    />
  </div>
)

export default ButtonSize
