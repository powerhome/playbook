import React from 'react'
import { Button } from '../../'

const ButtonLoading = (props) => (
  <div>
    <Button
        loading
        text="Button Primary"
        {...props}
    />
    {' '}
    <Button
        loading
        text="Button Secondary"
        variant="secondary"
        {...props}
    />
    {' '}
    <Button
        loading
        text="A Tag Button Disabled"
        variant="link"
        {...props}
    />
  </div>
)

export default ButtonLoading
