import React from 'react'
import { CheckboxCard } from '../../'


const CheckboxCardDefault = () => (
  <div>
    <CheckboxCard checked />
    <CheckboxCard  text="Unselected"/>
    <CheckboxCard checked text="Selected"/>
    <CheckboxCard  error text="Error Checkbox"/>
    <CheckboxCard highlight={{ position: 'top', color: 'doors' }} text="With Card Highlighting" />
  </div>

)

export default CheckboxCardDefault
