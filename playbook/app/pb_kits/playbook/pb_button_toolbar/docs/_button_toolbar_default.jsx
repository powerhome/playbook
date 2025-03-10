import React from 'react'

import { default as Button } from "../../pb_button/_button"
import { default as ButtonToolbar } from "../../pb_button_toolbar/_button_toolbar"

const ButtonToolbarDefault = (props) => (
  <div className="pb--doc-demo-row">
    <ButtonToolbar
        orientation="vertical"
        {...props}
    >
      <Button
          text="Create"
          {...props}
      />
      <Button
          text="Edit"
          {...props}
      />
      <Button
          text="Copy"
          {...props}
      />
      <Button
          text="Cut"
          {...props}
      />
    </ButtonToolbar>

    <ButtonToolbar
        orientation="horizontal"
        {...props}
    >
      <Button
          text="Create"
          {...props}
      />
      <Button
          text="Edit"
          {...props}
      />
      <Button
          text="Copy"
          {...props}
      />
      <Button
          text="Cut"
          {...props}
      />
    </ButtonToolbar>
  </div>
)

export default ButtonToolbarDefault
