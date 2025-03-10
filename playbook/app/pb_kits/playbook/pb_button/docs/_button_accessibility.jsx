import React from 'react'
import Button from "../../pb_button/_button"

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
