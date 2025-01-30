import React, { useState } from "react";
import { PhoneNumberInput, Body } from "playbook-ui";

const PhoneNumberInputFormat = (props) => {
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleOnChange = ({ number }) => {
        setPhoneNumber(number);
    };

    return (
        <>
            <PhoneNumberInput
                formatAsYouType
                id="format"
                onChange={handleOnChange}
                {...props}
            />
            {phoneNumber && <Body>Unformatted number: {phoneNumber}</Body>}
        </>
    );
};

export default PhoneNumberInputFormat;
