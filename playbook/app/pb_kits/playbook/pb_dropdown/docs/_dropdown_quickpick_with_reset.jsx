import React, { useRef } from 'react'

import Button from '../../pb_button/_button'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownQuickpickWithReset = (props) => {
    const dropdownRef = useRef(null)

    const handleReset = () => {
        if (dropdownRef.current) {
            dropdownRef.current.clearSelected()
        }
    }

    return (
        <>
            <Dropdown
                clearable={false}
                label="Date Range"
                onSelect={() => {}}
                ref={dropdownRef}
                variant="quickpick"
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

export default DropdownQuickpickWithReset
