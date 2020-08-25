import React from 'react'
import { CheckboxCard } from '../../'


const CheckboxCardDefault = () => (
  <div>
    <CheckboxCard checked />
    <CheckboxCard  text="Unselected"/>
    <CheckboxCard checked text="Selected"/>
    <CheckboxCard  error text="Error Checkbox"/>
    <CheckboxCard highlight={{ position: 'top', color: 'doors' }} text="With Card Highlighting" />
    <CheckboxCard text="Disabled" disabled />
  </div>

)

export default CheckboxCardDefault
