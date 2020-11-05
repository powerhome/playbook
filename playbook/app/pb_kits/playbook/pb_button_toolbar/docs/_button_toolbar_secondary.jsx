import React from 'react'
import { Button, ButtonToolbar } from '../..'

const ButtonToolbarSecondary = (props) => (
  <div className="pb--doc-demo-row">
    <ButtonToolbar
        {...props}
        orientation="vertical"
        variant="secondary"
    >
      <Button
          {...props}
          text="Create"
          variant="secondary"
      />
      <Button
          {...props}
          text="Edit"
          variant="secondary"
      />
      <Button
          {...props}
          text="Copy"
          variant="secondary"
      />
      <Button
          {...props}
          text="Cut"
          variant="secondary"
      />
    </ButtonToolbar>

    <ButtonToolbar
        {...props}
        orientation="horizontal"
        variant="secondary"
    >
      <Button
          {...props}
          text="Create"
          variant="secondary"
      />
      <Button
          {...props}
          text="Edit"
          variant="secondary"
      />
      <Button
          {...props}
          text="Copy"
          variant="secondary"
      />
      <Button
          {...props}
          text="Cut"
          variant="secondary"
      />
    </ButtonToolbar>
  </div>
)

export default ButtonToolbarSecondary
