import React from 'react'
import { default as Button } from "../../pb_button/_button"
import { default as ButtonToolbar } from "../../pb_button_toolbar/_button_toolbar"

const ButtonToolbarSecondary = (props) => (
  <div className="pb--doc-demo-row">
    <ButtonToolbar
        orientation="vertical"
        variant="secondary"
        {...props}
    >
      <Button
          text="Create"
          variant="secondary"
          {...props}
      />
      <Button
          text="Edit"
          variant="secondary"
          {...props}
      />
      <Button
          text="Copy"
          variant="secondary"
          {...props}
      />
      <Button
          text="Cut"
          variant="secondary"
          {...props}
      />
    </ButtonToolbar>

    <ButtonToolbar
        orientation="horizontal"
        variant="secondary"
        {...props}
    >
      <Button
          text="Create"
          variant="secondary"
          {...props}
      />
      <Button
          text="Edit"
          variant="secondary"
          {...props}
      />
      <Button
          text="Copy"
          variant="secondary"
          {...props}
      />
      <Button
          text="Cut"
          variant="secondary"
          {...props}
      />
    </ButtonToolbar>
  </div>
)

export default ButtonToolbarSecondary
