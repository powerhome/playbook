import React from 'react'
import { Button, ButtonGroup } from '../..'

const ButtonGroupVertical = () => (
  <div>
    <ButtonGroup
        orientation="vertical"
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
        orientation="vertical"
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

export default ButtonGroupVertical
