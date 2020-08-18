import React from 'react'
import { CheckboxCard } from '../../'


const CheckboxCardDark = () => (
  <div>
    <CheckboxCard dark checked />
    <CheckboxCard dark text="Unselected"/>
    <CheckboxCard dark checked text="Selected"/>
    <CheckboxCard dark error text="Error Checkbox"/>
    <CheckboxCard dark highlight={{ position: 'side', color: 'doors' }} text="With Card Highlighting" />
  </div>

)

export default CheckboxCardDark
