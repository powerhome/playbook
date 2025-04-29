import React, { useEffect, useState } from "react";

import Button from '../../pb_button/_button'
import FixedConfirmationToast from '../../pb_fixed_confirmation_toast/_fixed_confirmation_toast'
import PhoneNumberInput from '../../pb_phone_number_input/_phone_number_input'
import Icon from '../../pb_icon/_icon'

const PhoneNumberInputValidation = (props) => {
    const [formErrors, setFormErrors] = useState("");
    const [showFormErrors, setShowFormErrors] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("af");

    const handleOnValidate = (valid) => {
        setFormErrors(
            valid ? "" : "Please correct the fields below and try again."
        );
    };

    const handleOnChange = ({ iso2, number }) => {
        setCountryCode(iso2);
        setPhoneNumber(number);
    };
    
    const handleOnSubmit = (e) => {
        if (showFormErrors) e.preventDefault()
    }

    useEffect(() => {
        setShowFormErrors(formErrors.length > 0);
    }, [formErrors]);

    const error = (
        <>
            <Icon icon="warning" /> Missing phone number.
        </>
    )

    return (
        <form
            action=""
            method="get"
            onSubmit={handleOnSubmit}
        >
            {showFormErrors && (
                <FixedConfirmationToast
                    marginBottom="md"
                    status="error"
                    text={formErrors}
                />
            )}
            <PhoneNumberInput
                error={error}
                id="validation"
                initialCountry={countryCode}
                onChange={handleOnChange}
                onValidate={handleOnValidate}
                required
                value={phoneNumber}
                {...props}
            />
            <Button
                htmlType="submit"
                text="Save Phone Number"
            />
        </form>
    );
};

export default PhoneNumberInputValidation;
