import React from 'react'
import { Button } from '../../'

const ButtonDefault = () => (
  <div>
    <Button
        onClick={() => console.log("button clicked!")}
        text="Button Primary"
    />
    <Button
        onClick={() => console.log("button clicked!")}
        text="Button Secondary"
        variant="secondary"
    />
    <Button
        onClick={() => console.log("button clicked!")}
        text="Button Link"
        variant="link"
    />
    <Button
        disabled
        onClick={() => console.log("button clicked!")}
        text="Button Disabled"
    />
  </div>
)

export default ButtonDefault
