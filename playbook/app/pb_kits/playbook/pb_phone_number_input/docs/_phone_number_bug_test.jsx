import React, { useEffect, useState } from "react";
import { Caption, Title, PhoneNumberInput, Flex, FlexItem, Select, Card } from "playbook-ui";

const PhoneNumberBugTest = (props) => {
    const [formErrors, setFormErrors] = useState("");
    const [showFormErrors, setShowFormErrors] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("af");

    const options = [{ label: "Cell", value: "cell" }, { label: "Home", value: "home" }]

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

    return (
      <>
       <Flex justify="center"
           maxWidth="md"
       >
        <Card
            maxWidth="md"
            padding="md"
            position="sticky"
            tag="footer"
            zindex="10"
        >
        <Title
            size={4}
            text="Let's make sure we have your contact info."
        />
          <Caption
              marginBottom="sm"
              size="xs"
          >
            Enter your phone number and email below:
          </Caption>
        <form
            action=""
            method="get"
            onSubmit={handleOnSubmit}
        >
          <Flex maxWidth="md">
            <FlexItem fixedSize="68%">
              <PhoneNumberInput
                  error="Missing phone number."
                  id="validation"
                  initialCountry={countryCode}
                  label="Phone Number"
                  onChange={handleOnChange}
                  onValidate={handleOnValidate}
                  required
                  value={phoneNumber}
                  {...props}
              />
            </FlexItem>
            <FlexItem fixedSize="32%">
              <Select label="Type"
                  options={options}
              />
            </FlexItem>
            </Flex>
            </form>
          </Card>
        </Flex>
      </>

    );
};

export default PhoneNumberBugTest;