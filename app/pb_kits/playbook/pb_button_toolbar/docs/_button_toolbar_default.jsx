import React from 'react'
import { Button, ButtonToolbar } from '../..'

const ButtonToolbarDefault = (props) => (
  <div className="pb--doc-demo-row">
    <ButtonToolbar
        {...props}
        orientation="vertical"
    >
      <Button
          {...props}
          text="Create"
      />
      <Button
          {...props}
          text="Edit"
      />
      <Button
          {...props}
          text="Copy"
      />
      <Button
          {...props}
          text="Cut"
      />
    </ButtonToolbar>

    <ButtonToolbar
        {...props}
        orientation="horizontal"
    >
      <Button
          {...props}
          text="Create"
      />
      <Button
          {...props}
          text="Edit"
      />
      <Button
          {...props}
          text="Copy"
      />
      <Button
          {...props}
          text="Cut"
      />
    </ButtonToolbar>
  </div>
)

export default ButtonToolbarDefault
