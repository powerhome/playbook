import React from 'react'
import { Checkbox } from '../../'

function CheckboxDark() {
  return (
    <div>
      <Checkbox
          dark
          name='default name'
          text='Checkbox label'
          value='default value'
      />
    </div>
  )
}

export default CheckboxDark
