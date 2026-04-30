import React from 'react'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'

const PhoneNumberInputShowPlaceholder = (props) => (
    <>
        <PhoneNumberInput
            id='phone_number_input_show_placeholder'
            label='Phone Number'
            showPlaceholder
            {...props} />
    </>
)

export default PhoneNumberInputShowPlaceholder
