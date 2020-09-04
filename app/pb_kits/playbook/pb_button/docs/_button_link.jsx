import React from 'react'
import { Button } from '../../'

const ButtonLink = () => (
  <div>
    <Button
        link="https://google.com"
        text="A Tag Button"
    />
    {' '}
    <Button
        link="https://google.com"
        newWindow
        text="Open in New Window"
    />
    {' '}
    <Button
        disabled
        link="https://google.com"
        text="A Tag Button Disabled"
    />
  </div>
)

export default ButtonLink
