import React from 'react'
import { PhoneNumberInput } from 'playbook-ui'

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
