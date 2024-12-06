import React, { useState } from 'react'

import Caption from '../../pb_caption/_caption'
import TextInput from '../../pb_text_input/_text_input'
import Title from '../../pb_title/_title'

const TextInputMask = (props) => {
  const [ssn, setSSN] = useState('')
  const handleOnChangeSSN = ({ target }) => {
    setSSN(target.value)
  }
  const ref = React.createRef()

  const [formFields, setFormFields] = useState({
    zipCode: '',
    postalCode: '',
    ssn: '',
  })

  const handleOnChangeFormField =  ({ target }) => {
    const { name, value } = target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <TextInput
          label="Zip Code"
          mask="zipCode"
          name="zipCode"
          onChange={handleOnChangeFormField}
          value={formFields.zipCode}
          {...props}
      />
      <TextInput
          label="Postal Code"
          mask="postalCode"
          name="postalCode"
          onChange={handleOnChangeFormField}
          value={formFields.postalCode}
          {...props}
      />
      <TextInput
          label="SSN"
          mask="ssn"
          name="ssn"
          onChange={handleOnChangeFormField}
          value={formFields.ssn}
          {...props}
      />

      <br />
      <br />

      <Title>{'Event Handler Props'}</Title>

      <br />
      <Caption>{'onChange'}</Caption>

      <br />

      <TextInput
          label="SSN"
          mask="ssn"
          onChange={handleOnChangeSSN}
          placeholder="Enter SSN"
          ref={ref}
          value={ssn}
          {...props}
      />

      {ssn !== '' && (
        <React.Fragment>{`SSN is: ${ssn}`}</React.Fragment>
      )}
    </div>
  )
}

export default TextInputMask
