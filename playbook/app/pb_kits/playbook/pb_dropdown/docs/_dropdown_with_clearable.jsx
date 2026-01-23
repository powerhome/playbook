import React, { useRef } from 'react'

import Button from '../../pb_button/_button'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownWithClearable = (props) => {
    const dropdownRef = useRef(null)

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
    ]

    const handleReset = () => {
        if (dropdownRef.current) {
            dropdownRef.current.clearSelected()
        }
    }

    return (
        <>
            <Dropdown
                clearable={false}
                label="Quick Pick"
                onSelect={() => {}}
                ref={dropdownRef}
                variant="quickpick"
                {...props}
            />
            <Button
                marginY="md"
                onClick={handleReset}
                text="Reset"
            />

            <Dropdown
                clearable={false}
                defaultValue={options[options.length - 1]}
                label="Default"
                marginBottom="md"
                options={options}
                variant="default"
                {...props}
            />

            <Dropdown
                clearable={false}
                defaultValue={options[1]}
                label="Subtle"
                options={options}
                separators={false}
                variant="subtle"
                {...props}
            />
        </>
    )
}

export default DropdownWithClearable
