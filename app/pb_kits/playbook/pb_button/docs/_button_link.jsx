import React from 'react'
import { Button } from '../../'

const ButtonLink = (props) => (
  <div>
    <Button
        {...props}
        link="https://google.com"
        text="A Tag Button"
    />
    {' '}
    <Button
        {...props}
        link="https://google.com"
        newWindow
        text="Open in New Window"
    />
    {' '}
    <Button
        {...props}
        disabled
        link="https://google.com"
        text="A Tag Button Disabled"
    />
  </div>
)

export default ButtonLink
