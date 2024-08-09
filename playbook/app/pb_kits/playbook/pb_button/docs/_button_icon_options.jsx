import React from 'react'
import { Button } from 'playbook-ui'

const ButtonIconOptions = (props) => (
    <div>
      <Button
          fixedWidth
          icon='plus'
          marginRight='lg'
          tabIndex={0}
          text="Icon on Left"
          {...props}
      />
      {' '}
      <Button
          fixedWidth
          icon='chevron-right'
          iconRight
          marginRight='lg'
          tabIndex={0}
          text="Icon on Right"
          {...props}
      />
    </div>
  )
  
  export default ButtonIconOptions