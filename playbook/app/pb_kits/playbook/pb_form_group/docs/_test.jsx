import React from "react";
import { Card, FormGroup, PhoneNumberInput, Select } from "playbook-ui";

const Test = () => {
  const phoneOptions = [
    { value: "Cell" },
    { value: "Work" },
    { value: "Home" },
  ];

  return (
    <Card maxWidth="md"
        padding="md"
        position="sticky"
        tag="footer"
        zindex="10"
    >
      <FormGroup>
        <PhoneNumberInput
            error="Missing phone number."
            id="validation"
            initialCountry="us"
            label="Phone Number"
            required
        />
        <Select blankSelection="select"
            label="Type"
            options={phoneOptions}
        />
      </FormGroup>
    </Card>
  )
}

export default Test;