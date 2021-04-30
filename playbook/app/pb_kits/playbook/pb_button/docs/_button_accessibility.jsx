import React from 'react'
import { Button } from '../../'

const ButtonAccessibility = (props) => (
  <div>
    <Button
        aria={{ label: 'Go to Google' }}
        link="https://google.com"
        tag="a"
        text="Button with ARIA"
        {...props}
    />
  </div>
)

export default ButtonAccessibility
