import React, { useRef } from 'react'
import { Button, PhoneNumberInput } from '../../'

const PhoneNumberInputRef = (props) => {
    const ref = useRef()

    const handleClick = () => {
        // Get the input element and name attribute
        console.log(ref.current)
        alert(`${ref.current.name} Check the console for all of the input element's attributes!`)
    }

    return (
        <>
            <PhoneNumberInput
                id='default'
                name="This is my name attribute!"
                ref={ref}
                {...props}
            />

            <Button
                onClick={handleClick}
                text="Click Me!"
            />
        </>
    )
}

export default PhoneNumberInputRef
