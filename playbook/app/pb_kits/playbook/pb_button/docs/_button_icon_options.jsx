import React from 'react'
import { Button } from '../../'

const ButtonIconOptions = (props) => (
    <div>
      <Button
          fixedWidth
          icon='plus'
          text="Icon on Left"
          {...props}
      />
      {' '}
      <Button
          fixedWidth
          icon='chevron-right'
          iconRight
          text="Icon on Right"
          {...props}
      />
    </div>
  )
  
  export default ButtonIconOptions