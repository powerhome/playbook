import React from 'react'
import { PhoneNumberInput } from 'playbook-ui'

const PhoneNumberInputPreferredCountries = (props) => (
  <>
    <PhoneNumberInput
        id='preferred'
        preferredCountries={['us', 'br', 'ph', 'gb']}
        {...props} 
    />
  </>
)

export default PhoneNumberInputPreferredCountries
