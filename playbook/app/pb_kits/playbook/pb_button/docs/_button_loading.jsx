import React from 'react'
import { Button } from '../../'

const ButtonLoading = (props) => (
  <div>
    <Button
        {...props}
        loading
        text="Button Primary"
    />
    {' '}
    <Button
        {...props}
        loading
        text="Button Secondary"
        variant="secondary"
    />
    {' '}
    <Button
        {...props}
        loading
        text="A Tag Button Disabled"
        variant="link"
    />
  </div>
)

export default ButtonLoading
