import React from 'react'
import { Button } from '../../'

const ButtonLoading = (props) => (
  <div>
    <Button
        aria={{ label: 'Loading' }}
        loading
        text="Button Primary"
        {...props}
    />
    {' '}
    <Button
        aria={{ label: 'Loading' }}
        loading
        text="Button Secondary"
        variant="secondary"
        {...props}
    />
    {' '}
    <Button
        aria={{ label: 'Loading' }}
        loading
        text="A Tag Button Disabled"
        variant="link"
        {...props}
    />
  </div>
)

export default ButtonLoading
