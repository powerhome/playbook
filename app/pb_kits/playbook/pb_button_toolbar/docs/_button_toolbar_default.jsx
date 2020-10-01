import React from 'react'
import { Button, ButtonToolbar } from '../..'

const ButtonToolbarDefault = (props) => (
  <div className="pb--doc-demo-row">
    <ButtonToolbar
        {...props}
        connected
        orientation="vertical"
    >
      <Button
          {...props}
          text="Field"
      />
      <Button
          {...props}
          text="Retail"
      />
      <Button
          {...props}
          text="Event"
      />
      <Button
          {...props}
          text="Training"
      />
      <Button
          {...props}
          text="Not Working"
      />
    </ButtonToolbar>

    <ButtonToolbar
        {...props}
        connected
        orientation="horizontal"
    >
      <Button
          {...props}
          text="Field"
      />
      <Button
          {...props}
          text="Retail"
      />
      <Button
          {...props}
          text="Event"
      />
      <Button
          {...props}
          text="Training"
      />
      <Button
          {...props}
          text="Not Working"
      />
    </ButtonToolbar>
  </div>
)

export default ButtonToolbarDefault
