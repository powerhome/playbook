import React from 'react'
import { Button } from 'playbook-ui'

const ButtonLink = (props) => (
  <>
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
        aria={{ label: 'Link to Playbook in new window' }}
        link="https://playbook.powerapp.cloud/"
        marginRight='lg'
        tabIndex={0}
        target='child'
        text="Open in a Child Tab"
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
  </>
)

export default ButtonLink
