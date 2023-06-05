import React, { useEffect, useState } from "react";
import { Button, FixedConfirmationToast, PhoneNumberInput } from "../../";

const PhoneNumberInputValidation = (props) => {
    const [formErrors, setFormErrors] = useState("")
    const [showFormErrors, setShowFormErrors] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("70 123 4567")
    const [countryCode, setCountryCode] = useState("af")

    const handleOnValidate = (valid) => {
        setFormErrors(valid ? "" : "Please correct the fields below and try again.")
    }

    const handleOnChange = ({ iso2, number }) => {
        setCountryCode(iso2)
        setPhoneNumber(number)
    }

    useEffect(() => {
        setShowFormErrors(formErrors.length > 0)
    }, [formErrors])

    return (
        <React.Fragment>
            {showFormErrors && (
                <FixedConfirmationToast
                    closeable
                    marginBottom="md"
                    status="error"
                    text={formErrors}
                />
            )}
            <PhoneNumberInput
                id="validation"
                initialCountry={countryCode}
                onChange={handleOnChange}
                onValidate={handleOnValidate}
                value={phoneNumber}
                {...props}
            />
            <Button text="Save Phone Number" />
        </React.Fragment>
    );
};

export default PhoneNumberInputValidation;
