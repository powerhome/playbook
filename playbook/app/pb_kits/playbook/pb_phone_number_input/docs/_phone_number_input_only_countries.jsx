import React from 'react'
import { PhoneNumberInput } from '../../'

const PhoneNumberInputOnlyCountries = () => (
  <>
    <PhoneNumberInput
        id='only'
        onlyCountries={['us', 'br']}
    />
  </>
)

export default PhoneNumberInputOnlyCountries
