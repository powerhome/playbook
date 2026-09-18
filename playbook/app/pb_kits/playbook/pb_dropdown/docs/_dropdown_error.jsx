import React, { useState } from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownError = (props) => {
    const [selectedOption, setSelectedOption] = useState()
    const error = selectedOption?.value ? null : "Please make a valid selection"
    const options = [
        {
            label: "United States",
            value: "unitedStates",
            id: "us"
        },
        {
            label: "Canada",
            value: "canada",
            id: "ca"
        },
        {
            label: "Pakistan",
            value: "pakistan",
            id: "pk"
        }
    ];  

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
