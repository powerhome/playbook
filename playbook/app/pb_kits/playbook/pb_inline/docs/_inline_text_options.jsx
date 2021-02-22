import React, { useState } from 'react'
import { Body, Caption, Inline, TextInput, Title } from '../../'

const InlineTextOptions = (props) => {
  const [formFields, setFormFields] = useState({
    inputOne: 'Input One',
    inputTwo: 'Input Two',
    inputThree: 'Input Three',
    inputFour: 'Input Four',
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <Inline
          {...props}
          displayKit={
            <Title
                kitType="Title"
                size={1}
                tag="h1"
                text={formFields.inputOne}
            />
          }
          formInput={
            <TextInput
                name="inputOne"
                onChange={handleChange}
                value={formFields.inputOne}
            />
          }
      />
      <Inline
          {...props}
          displayKit={
            <Title
                kitType="Title 4"
                size={4}
                tag="h4"
                text={formFields.inputTwo}
            />
          }
          formInput={
            <TextInput
                name="inputTwo"
                onChange={handleChange}
                value={formFields.inputTwo}
            />
          }
      />
      <Inline
          {...props}
          displayKit={
            <Body
                kitType="Body"
                text={formFields.inputThree}
            />
          }
          formInput={
            <TextInput
                name="inputThree"
                onChange={handleChange}
                value={formFields.inputThree}
            />
          }
      />
      <Inline
          {...props}
          displayKit={
            <Caption
                kitType="Caption"
                text={formFields.inputFour}
            />
          }
          formInput={
            <TextInput
                name="inputFour"
                onChange={handleChange}
                value={formFields.inputFour}
            />
          }
      />
    </div>
  )
}

export default InlineTextOptions
