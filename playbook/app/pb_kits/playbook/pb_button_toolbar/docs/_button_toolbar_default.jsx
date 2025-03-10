import React from 'react'

import Button from '../../pb_button/_button'
import ButtonToolbar from '../../pb_button_toolbar/_button_toolbar'

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
