import React from 'react'
import { Button } from 'playbook-ui'

const ButtonLoading = (props) => (
  <div>
    <Button
        aria={{ label: 'Loading' }}
        loading
        marginRight='lg'
        
        text="Button Primary"
        {...props}
    />
    {' '}
    <Button
        aria={{ label: 'Loading' }}
        loading
        marginRight='lg'
        tabIndex={0}
        text="Button Secondary"
        variant="secondary"
        {...props}
    />
    {' '}
    <Button
        aria={{ label: 'Loading' }}
        loading
        marginRight='lg'
        tabIndex={0}
        text="A Tag Button Disabled"
        variant="link"
        {...props}
    />
  </div>
)

export default ButtonLoading
