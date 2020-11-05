import React from 'react'
import { Button } from '../../'

const ButtonAccessibility = (props) => (
  <div>
    <Button
        {...props}
        aria={{ label: 'button' }}
        link="https://google.com"
        tag="a"
        text="Button with ARIA"
    />
  </div>
)

export default ButtonAccessibility
