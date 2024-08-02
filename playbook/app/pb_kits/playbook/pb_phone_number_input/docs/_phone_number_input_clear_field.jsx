import React, { useRef } from 'react'
import { Button, PhoneNumberInput } from 'playbook-ui'

const PhoneNumberInputClearField = (props) => {
    // 1. Create a ref - this accesses the kit's input element.
    const ref = useRef()

    // 2. Use clearField() to clear the field.
    const handleClick = () => {
        ref.current.clearField()
    }

    // 3. Pass the ref to the ref prop.
    return (
        <>
            <PhoneNumberInput
                id="clear-field"
                ref={ref}
                {...props}
            />

            <Button
                onClick={handleClick}
                text="Clear the Input Field"
            />
        </>
    )
}

export default PhoneNumberInputClearField
