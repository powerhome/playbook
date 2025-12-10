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
    const [isValid, setIsValid] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Start with initial error - will be cleared on blur if valid
    const initialError = (
        <>
            <Icon icon="warning" /> Missing phone number.
        </>
    );

    const handleOnValidate = (valid) => {
        setIsValid(valid);
        setHasInteracted(true);
        setFormErrors(
            valid ? "" : "Please correct the fields below and try again."
        );
    };

    const handleOnChange = ({ iso2, number }) => {
        setCountryCode(iso2);
        setPhoneNumber(number);
    };
    
    const handleOnSubmit = (e) => {
        if (!isValid) e.preventDefault()
    }

    useEffect(() => {
        setShowFormErrors(formErrors.length > 0);
    }, [formErrors]);

    // Only show error prop initially, or if invalid after interaction
    // Clear error prop once valid (component handles validation on blur)
    const shouldShowError = !hasInteracted || (hasInteracted && !isValid);

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
                error={shouldShowError ? initialError : undefined}
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
