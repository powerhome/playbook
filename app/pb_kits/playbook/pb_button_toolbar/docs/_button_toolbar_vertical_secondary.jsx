import React from 'react'
import { Button, ButtonToolbar } from '../..'

const ButtonToolbarVerticalSecondary = () => (
  <div>
    <ButtonToolbar
        connected
        orientation="vertical"
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

export default ButtonToolbarVerticalSecondary
