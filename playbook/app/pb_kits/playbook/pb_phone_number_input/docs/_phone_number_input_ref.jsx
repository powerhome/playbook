import React, { useRef } from 'react'
import { Button, PhoneNumberInput } from '../../'

const PhoneNumberInputRef = (props) => {
    const ref = useRef()

    const handleClick = () => {
        ref.current.value = ""
    }

    return (
        <>
            <PhoneNumberInput
                id="ref"
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

export default PhoneNumberInputRef
