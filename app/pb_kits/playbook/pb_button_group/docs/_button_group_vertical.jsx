import React from 'react'
import { ButtonGroup } from '../..'

const ButtonGroupVertical = () => (
  <div>
    <ButtonGroup
        onClick={() => alert('Click!')}
        orientation="vertical"
        text="Button Primary"
    />

    <ButtonGroup
        onClick={() => alert('Click!')}
        orientation="vertical"
        text="Button Secondary"
        variant="secondary"
    />

    <ButtonGroup
        onClick={() => alert('Click!')}
        orientation="vertical"
        text="Button Secondary"
        variant="secondary"
    />

    <br />
    <br />

    <ButtonGroup
        connected
        onClick={() => alert('Click!')}
        orientation="vertical"
        text="Button Primary"
    />

    <ButtonGroup
        connected
        onClick={() => alert('Click!')}
        orientation="vertical"
        text="Button Secondary"
        variant="secondary"
    />

    <ButtonGroup
        connected
        onClick={() => alert('Click!')}
        orientation="vertical"
        text="Button Secondary"
        variant="secondary"
    />
  </div>
)

export default ButtonGroupVertical
