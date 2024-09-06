import React from 'react'
import Radio from '../_radio'
import Select from '../../pb_select/_select'
import Typeahead from '../../pb_typeahead/_typeahead'
import Title from '../../pb_title/_title'

const RadioChildren = (props) => {


  const options = [
    { label: 'Orange', value: 'Orange' },
    { label: 'Red', value: 'Red' },
    { label: 'Green', value: 'Green' },
    { label: 'Blue', value: 'Blue' },
  ]

  return (
    <div>
      <Radio
          label="Select"
          marginBottom="sm"
          name="Group1"
          tabIndex={0}
          value="Select"
          {...props}
      >
        <Select 
            marginBottom="none"
            minWidth="xs"
            options={options}
        />
      </Radio>
      <Radio
          label="Typeahead"
          marginBottom="sm"
          name="Group1"
          tabIndex={0}
          value="Typeahead"
          {...props}
      >
        <Typeahead 
            marginBottom="none"
            minWidth="xs"
            options={options}
        />
      </Radio>
      <Radio
          defaultChecked={false}
          label="Typography"
          name="Group1"
          value="Typography"
          {...props}
      >
        <Title text="Custom Typography" />
      </Radio>
    </div>
  )
}
export default RadioChildren
