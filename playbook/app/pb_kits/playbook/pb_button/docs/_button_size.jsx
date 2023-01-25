import React from 'react'
import { Button } from '../../'

const ButtonSize = (props) => (
  <div>
    <Button
        marginRight='lg'
        size="sm"
        text="Button sm size"
        {...props}
    />
    {' '}
    <Button
        marginRight='lg'
        size="md"
        text="Button md size"
        {...props}
    />
    {' '}
    <Button
        marginRight='lg'
        size="lg"
        text="Button lg size"
        {...props}
    />
  </div>
)

export default ButtonSize
