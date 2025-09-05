import React, { useState } from 'react'

import TextInput from '../../pb_text_input/_text_input'
import Body from '../../pb_body/_body'


const TextInputAutocomplete = (props) => {
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    emailTest: "",
    email: "",
  });

  const handleOnChangeFormField = ({ target }) => {
    const { name, value } = target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <TextInput
          autoComplete={false}
          label="autocomplete='off'"
          name="firstName"
          onChange={handleOnChangeFormField}
          placeholder="Enter first name"
          value={formFields.firstName}
          {...props}
      />
      <TextInput
          label="no autocomplete attribute (let browser decide- basically 'on')"
          name="lastName"
          onChange={handleOnChangeFormField}
          placeholder="Enter last name"
          value={formFields.lastName}
          {...props}
      />
      <TextInput
          autoComplete
          label="autocomplete='on'"
          name="phone"
          onChange={handleOnChangeFormField}
          placeholder="Enter phone number"
          type="phone"
          value={formFields.phone}
          {...props}
      />
      <Body marginBottom="sm">
        The following have the same autocomplete attributes (email), but have
        different name attributes (email and emailAlt). Many browsers will
        open autocomplete based on name attributes instead of autocomplete:
      </Body>
      <TextInput
          autoComplete="email"
          label="autocomplete='email' name='email'"
          name="email"
          onChange={handleOnChangeFormField}
          placeholder="Enter email address"
          type="email"
          value={formFields.email}
          {...props}
      />
      <TextInput
          autoComplete="email"
          label="autocomplete='email' name='emailAlt'"
          marginTop="sm"
          name="emailTest"
          onChange={handleOnChangeFormField}
          placeholder="Enter email address"
          type="email"
          value={formFields.emailTest}
          {...props}
      />
    </div>
  );
};

export default TextInputAutocomplete;
