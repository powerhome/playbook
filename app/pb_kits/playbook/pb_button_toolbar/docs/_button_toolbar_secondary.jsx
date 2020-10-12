import React from 'react'
import { Button, ButtonToolbar } from '../..'

const ButtonToolbarSecondary = () => (
  <div>
    <ButtonToolbar
        connected
        orientation="horizontal"
    >
      <Button
          text="Field"
          variant="secondary"
      />
      <Button
          text="Retail"
          variant="secondary"
      />
      <Button
          text="Event"
          variant="secondary"
      />
      <Button
          text="Training"
          variant="secondary"
      />
      <Button
          text="Not Working"
          variant="secondary"
      />
    </ButtonToolbar>
  </div>
)

export default ButtonToolbarSecondary
