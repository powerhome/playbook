import React from 'react'
import { Button } from '../../'

const ButtonDefault = () => (
  <div>
    <Button
        onClick={() => alert('button clicked!')}
        text="Button Primary"
    />
    <Button
        onClick={() => alert('button clicked!')}
        text="Button Secondary"
        variant="secondary"
    />
    <Button
        onClick={() => alert('button clicked!')}
        text="Button Link"
        variant="link"
    />
    <Button
        disabled
        onClick={() => alert('button clicked!')}
        text="Button Disabled"
    />
  </div>
)

export default ButtonDefault
