import React from 'react'
import { CheckboxCard } from '../../'


const CheckboxCardDark = () => (
  <div>
    <CheckboxCard dark checked />
    <CheckboxCard dark checked text="Text Prop"/>
    <CheckboxCard dark>
      Child Text
    </CheckboxCard>
    <CheckboxCard dark>
      <span>Hello in a span child</span>
    </CheckboxCard>
  </div>

)

export default CheckboxCardDark
