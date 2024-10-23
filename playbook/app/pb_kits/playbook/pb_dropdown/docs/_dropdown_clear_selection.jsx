import React, { useRef } from 'react'
import { Button, Dropdown } from 'playbook-ui'

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
