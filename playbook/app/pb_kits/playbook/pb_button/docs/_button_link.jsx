import React from 'react'
import { Button } from '../../'

const ButtonLink = (props) => (
  <div>
    <Button
        link="https://google.com"
        text="A Tag Button"
        {...props}
    />
    {' '}
    <Button
        link="https://google.com"
        newWindow
        text="Open in New Window"
        {...props}
    />
    {' '}
    <Button
        disabled
        link="https://google.com"
        text="A Tag Button Disabled"
        {...props}
    />
  </div>
)

export default ButtonLink
