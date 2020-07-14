import React from 'react'
import { Button, ButtonToolbar } from '../..'

const ButtonToolbarVertical = () => (
  <div>
    <ButtonToolbar
        connected
        orientation="vertical"
    >
      <Button
          text="Personal Info"
      />
      <Button
          text="Relevant Employment Experience"
      />
      <Button
          text="Resume Submission"
      />
    </ButtonToolbar>
  </div>
)

export default ButtonToolbarVertical
