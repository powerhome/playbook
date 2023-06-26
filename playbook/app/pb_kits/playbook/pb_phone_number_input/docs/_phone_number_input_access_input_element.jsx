import React, { useEffect, useRef } from 'react'
import { Body, PhoneNumberInput } from '../..'

const PhoneNumberInputAccessInputElement = (props) => {
    // 1. Create a ref - this accesses the kit's input element.
    const ref = useRef()

    // 2. Add any event listener to ref.current.inputNode() inside a useEffect hook.
    useEffect(() => {
        ref.current.inputNode().addEventListener("click", () => alert("Clicked!"))
    })

    // 3. Pass the ref to the ref prop.
    return (
        <>
            <Body text="Click the input field below:" />
            <PhoneNumberInput
                id="access-input-element"
                ref={ref}
                {...props}
            />
        </>
    )
}

export default PhoneNumberInputAccessInputElement
