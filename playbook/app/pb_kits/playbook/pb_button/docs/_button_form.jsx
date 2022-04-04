import React from 'react'
import { Button } from '../../'

const ButtonForm = (props) => (
  <div>
    <Button
        form="form-id"
        text="Button with Form Attribute"
        {...props}
    />
  </div>
)

export default ButtonForm
