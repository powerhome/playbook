import React from 'react'
import { PhoneNumberInput } from '../../'

const PhoneNumberInputPreferredCountries = () => (
  <>
    <PhoneNumberInput
        id='preferred'
        preferredCountries={['us', 'br', 'ph', 'gb']}
    />
  </>
)

export default PhoneNumberInputPreferredCountries
