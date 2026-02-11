import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownClosingOptions = (props) => {
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
                options={options}
                {...props}
            />
            <br />

            <Dropdown
                closeOnClick='outside'
                options={options}
                {...props}
            />

            <br />
            <Dropdown
                closeOnClick='inside'
                options={options}
                {...props}
            />
        </>
    )
}

export default DropdownClosingOptions
