import React from "react";

import Body from '../../pb_body/_body'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'

const PhoneNumberInputStrictMode = (props) => {

    return (
        <>
            <PhoneNumberInput
                id="strict"
                strictMode
                {...props}
            />
            <Body>With formatAsYouType</Body>
            <PhoneNumberInput
                formatAsYouType
                id="strict"
                strictMode
                {...props}
            />
        </>
    );
};

export default PhoneNumberInputStrictMode;
