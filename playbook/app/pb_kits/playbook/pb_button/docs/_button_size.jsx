import React from 'react'
import { Button } from 'playbook-ui'

const ButtonSize = (props) => (
  <div>
    <Button
        marginRight='lg'
        size="sm"
        tabIndex={0}
        text="Button sm size"
        {...props}
    />
    {' '}
    <Button
        marginRight='lg'
        size="md"
        tabIndex={0}
        text="Button md size"
        {...props}
    />
    {' '}
    <Button
        marginRight='lg'
        size="lg"
        tabIndex={0}
        text="Button lg size"
        {...props}
    />
  </div>
)

export default ButtonSize
