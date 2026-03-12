import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'
import Caption from '../../pb_caption/_caption'

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
            <Caption 
                marginBottom="xs" 
                text="Any"
            />
            <Dropdown
                closeOnClick='any'
                options={options}
                {...props}
            />

            <br />
                
            <Caption 
                marginBottom="xs" 
                text="Outside"
            />
            <Dropdown
                closeOnClick='outside'
                options={options}
                {...props}
            />

            <br />

            <Caption 
                marginBottom="xs" 
                text="Inside"
            />
            <Dropdown
                closeOnClick='inside'
                options={options}
                {...props}
            />
        </>
    )
}

export default DropdownClosingOptions
