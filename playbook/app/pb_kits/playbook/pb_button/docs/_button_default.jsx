import React from 'react'
import { Button } from '../../'

const ButtonDefault = (props) => (
  <div>
    <Button
        {...props}
        marginRight="xl"
        onClick={() => alert('button clicked!')}
        text="Button Primary"
    />
    {' '}
    <Button
        onClick={() => alert('button clicked!')}
        text="Button Secondary"
        variant="secondary"
        {...props}
    />
    {' '}
    <Button
        onClick={() => alert('button clicked!')}
        text="Button Link"
        variant="link"
        {...props}
    />
    <Button
        disabled
        onClick={() => alert('button clicked!')}
        text="Button Disabled"
        {...props}
    />
  </div>

)

export default ButtonDefault
