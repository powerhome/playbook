import React from 'react'
import {Radio} from '../../'

function RadioDark() {
  return (
    <div>
      <Radio
          dark
          label='Power'
          name='Group1'
          value='Power'
      />
    <br/>
      <Radio
          dark
          label='Nitro'
          name='Group1'
          value='Nitro'
      />
    </div>
  )
}
export default RadioDark
