import React from 'react'
import { Button, ButtonGroup } from '../..'

const ButtonGroupVertical = () => (
  <div>
    <ButtonGroup
        onClick={() => alert('Click!')}
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

    <br />
    <br />

    <ButtonGroup
        connected
        onClick={() => alert('Click!')}
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