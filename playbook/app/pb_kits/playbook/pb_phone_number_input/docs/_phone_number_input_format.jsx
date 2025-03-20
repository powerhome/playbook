import React, { useState } from "react";

import Body from '../../pb_body/_body'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'

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
