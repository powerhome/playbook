import React from 'react'
import { Dropdown } from '../../'

const DropdownError = (props) => {
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
    ];

    return (
        <>
            <Dropdown
                error="Please make a valid selection"
                options={options}
                {...props}
            />
        </>
    )
}

export default DropdownError
