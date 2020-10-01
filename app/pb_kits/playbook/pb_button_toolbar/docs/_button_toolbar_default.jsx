import React from 'react'
import { Button, ButtonToolbar } from '../..'

const ButtonToolbarDefault = () => (
  <div className="pb--doc-demo-row">
    <ButtonToolbar
        connected
        orientation="vertical"
    >
      <Button
          text="Field"
      />
      <Button
          text="Retail"
      />
      <Button
          text="Event"
      />
      <Button
          text="Training"
      />
      <Button
          text="Not Working"
      />
    </ButtonToolbar>

    <ButtonToolbar
        connected
        orientation="horizontal"
    >
      <Button
          text="Field"
      />
      <Button
          text="Retail"
      />
      <Button
          text="Event"
      />
      <Button
          text="Training"
      />
      <Button
          text="Not Working"
      />
    </ButtonToolbar>
  </div>
)

export default ButtonToolbarDefault
