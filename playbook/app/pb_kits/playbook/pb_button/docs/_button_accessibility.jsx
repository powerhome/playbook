import React from 'react'
import { Button } from 'playbook-ui'

const ButtonAccessibility = (props) => (
  <div>
    <Button
        aria={{ label: 'Go to Google' }}
        link="https://google.com"
        tabIndex={0}
        tag="a"
        text="Button with ARIA"
        {...props}
    />
  </div>
)

export default ButtonAccessibility
