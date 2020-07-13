import React from 'react'
import { Button, ButtonGroup } from '../..'
// import button

const ButtonGroupDefault = () => (
  <div>
    <ButtonGroup
        orientation="horizontal"
    >
      <Button
          onClick={() => alert('Click!')}
          text="Button Primary"
      />
      <Button
          text="Button Secondary"
          variant="secondary"
      />
      <Button
          text="Button Secondary"
          variant="secondary"
      />
    </ButtonGroup>

    <br />
    <br />

    <ButtonGroup
        connected
        orientation="horizontal"
    >
      <Button
          text="Button Primary"
      />
      <Button
          text="Button Secondary"
          variant="secondary"
      />
      <Button
          text="Button Secondary"
          variant="secondary"
      />
    </ButtonGroup>
  </div>
)

export default ButtonGroupDefault
