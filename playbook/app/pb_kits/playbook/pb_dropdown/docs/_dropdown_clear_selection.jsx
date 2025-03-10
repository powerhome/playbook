import React, { useRef } from 'react'

import Button from '../../pb_button/_button'
import Dropdown from '../../pb_dropdown/_dropdown'

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

const DropdownClearSelection = (props) => {
    const dropdownRef = useRef(null)

    const handleReset = () => {
        if (dropdownRef.current) {
            dropdownRef.current.clearSelected()
        }
    }

    return (
        <>
            <Dropdown
                defaultValue={options[2]}
                options={options}
                ref={dropdownRef}
                {...props}
            />
            <Button
                marginTop="md"
                onClick={handleReset}
                text="Reset"
            />
        </>
    )
}

export default DropdownClearSelection
