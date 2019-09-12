import React from 'react'
import Button from '../_button.jsx'

const ButtonAccessibility = () => (
    <div>
        <Button
            aria={{label: "button"}}
            link="https://google.com"
            tag="a"
            text="Button with ARIA"
        />
    </div>
)

export default ButtonAccessibility
