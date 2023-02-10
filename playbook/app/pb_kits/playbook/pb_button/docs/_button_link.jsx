import React from 'react'
import { Button } from '../../'

const ButtonLink = (props) => (
  <div>
    <Button
        aria={{ label: 'Link to Google' }}
        link="https://google.com"
        marginRight='lg'
        tabIndex={0}
        text="A Tag Button"
        {...props}
    />
    {' '}
    <Button
        aria={{ label: 'Link to Google in new window' }}
        link="https://google.com"
        marginRight='lg'
        newWindow
        tabIndex={0}
        text="Open in New Window"
        {...props}
    />
    {' '}
    <Button
        aria={{ label: 'Disabled link to Google' }}
        disabled
        link="https://google.com"
        marginRight='lg'
        tabIndex={0}
        text="A Tag Button Disabled"
        {...props}
    />
  </div>
)

export default ButtonLink
