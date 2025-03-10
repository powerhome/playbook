import React, { useState } from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownError = (props) => {
    const [selectedOption, setSelectedOption] = useState()
    const error = selectedOption?.value ? null : "Please make a valid selection"
    const options = [
        {
            label: "United States",
            value: "United States",
        },
        {
            label: "Canada",
            value: "Canada",
        },
        {
            label: "Pakistan",
            value: "Pakistan",
        }
    ]

    return (
        <>
            <Dropdown
                error={error}
                onSelect={(selectedItem) => setSelectedOption(selectedItem)}
                options={options}
                {...props}
            />
        </>
    )
}

export default DropdownError
