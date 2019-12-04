import React from 'react'
import {Radio} from '../_radio.jsx'

function RadioDefault() {
  return (
    <>
      <Radio label='Power'
          name='Group1'
          value='Power'
      />
      <br/>
      <Radio label='Nitro'
          name='Group1'
          value='Nitro'
      />
      <br/>
      <Radio label='Google'
          name='Group1'
          value='Google'
      />
    </>
  )
}
export default RadioDefault
