import React from 'react'
import { PhoneNumberInput } from '../../'

const PhoneNumberInitialCountry = (props) => (
    <>
        <PhoneNumberInput
            id='initial'
            initialCountry='br'
            {...props}
        />
    </>
)

export default PhoneNumberInitialCountry
