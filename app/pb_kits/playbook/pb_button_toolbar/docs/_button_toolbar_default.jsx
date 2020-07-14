import React from 'react'
import { Button, ButtonToolbar } from '../..'

const ButtonToolbarDefault = () => (
  <div>
    <ButtonToolbar
        connected
        orientation="horizontal"
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

export default ButtonToolbarDefault
