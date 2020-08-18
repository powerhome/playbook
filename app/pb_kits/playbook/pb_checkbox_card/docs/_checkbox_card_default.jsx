import React from 'react'
import { CheckboxCard } from '../../'


const CheckboxCardDefault = () => (
  <div>
    <CheckboxCard checked />
    <CheckboxCard checked text="Text Prop"/>
    <CheckboxCard>
      Child Text
    </CheckboxCard>
    <CheckboxCard>
      <span>Hello in a span child</span>
    </CheckboxCard>
  </div>

)

export default CheckboxCardDefault
