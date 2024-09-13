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
          customChildren
          label="Select"
          name="Group1"
          tabIndex={0}
          value="Select"
          {...props}
      >
        <Select 
            minWidth="xs"
            options={options}
        />
      </Radio>
      <Radio
          customChildren
          label="Typeahead"
          name="Group1"
          tabIndex={0}
          value="Typeahead"
          {...props}
      >
        <Typeahead 
            minWidth="xs"
            options={options}
        />
      </Radio>
      <br />
      <Radio
          customChildren
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
