import React from 'react'
import { Button, ButtonToolbar } from '../..'

const ButtonToolbarSecondary = (props) => (
  <div className="pb--doc-demo-row">
    <ButtonToolbar
        {...props}
        connected
        orientation="vertical"
        variant="secondary"
    >
      <Button
          {...props}
          text="Field"
          variant="secondary"
      />
      <Button
          {...props}
          text="Retail"
          variant="secondary"
      />
      <Button
          {...props}
          text="Event"
          variant="secondary"
      />
      <Button
          {...props}
          text="Training"
          variant="secondary"
      />
      <Button
          {...props}
          text="Not Working"
          variant="secondary"
      />
    </ButtonToolbar>

    <ButtonToolbar
        {...props}
        connected
        orientation="horizontal"
        variant="secondary"
    >
      <Button
          {...props}
          text="Field"
          variant="secondary"
      />
      <Button
          {...props}
          text="Retail"
          variant="secondary"
      />
      <Button
          {...props}
          text="Event"
          variant="secondary"
      />
      <Button
          {...props}
          text="Training"
          variant="secondary"
      />
      <Button
          {...props}
          text="Not Working"
          variant="secondary"
      />
    </ButtonToolbar>
  </div>
)

export default ButtonToolbarSecondary
