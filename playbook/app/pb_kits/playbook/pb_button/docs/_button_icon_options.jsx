import React from 'react'
import { Button } from '../../'

const ButtonIconOptions = (props) => (
    <div>
      <Button
          fixedWidth
          icon='plus'
          marginRight='lg'
          text="Icon on Left"
          {...props}
      />
      {' '}
      <Button
          fixedWidth
          icon='chevron-right'
          iconRight
          marginRight='lg'
          text="Icon on Right"
          {...props}
      />
    </div>
  )
  
  export default ButtonIconOptions