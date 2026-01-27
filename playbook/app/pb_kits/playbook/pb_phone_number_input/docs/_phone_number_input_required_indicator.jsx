import React from 'react'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'

const PhoneNumberInputRequiredIndicator = (props) => (
    <>
        <PhoneNumberInput
            id='phone_number_input_required_indicator'
            label='Phone Number'
            requiredIndicator
            {...props} />
    </>
)

export default PhoneNumberInputRequiredIndicator
