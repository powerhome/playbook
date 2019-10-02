import React from 'react'
import {Checkbox} from '../../'

function CheckboxDark() {
  return (
    <div>
      <Checkbox
          dark
          label='Checkbox label'
          name='default name'
          value='default value'
      />
    </div>
  )
}

export default CheckboxDark;
