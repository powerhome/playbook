import React from 'react'
import {Radio} from '../../'

function RadioDark() {
  return (
    <>
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
      <br/>
      <Radio
          dark
          label='Google'
          name='Group1'
          value='Google'
      />
    </div>
  )
}
export default RadioDark
