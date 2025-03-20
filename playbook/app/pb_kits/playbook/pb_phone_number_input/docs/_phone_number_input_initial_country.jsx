import React from 'react'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'

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
