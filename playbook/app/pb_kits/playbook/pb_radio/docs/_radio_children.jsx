import React from 'react'
import Radio from '../_radio'
import Dropdown from '../../pb_dropdown/_dropdown'
import Title from '../../pb_title/_title'

const RadioChildren = (props) => {


  const options = [
    { label: 'Orange', value: '#FFA500' },
    { label: 'Red', value: '#FF0000' },
    { label: 'Green', value: '#00FF00' },
    { label: 'Blue', value: '#0000FF' },
  ]

  return (
    <div>
      <Radio
          label="Power"
          name="Group2"
          tabIndex={0}
          value="Power"
          {...props}
      >
        <Dropdown 
            minWidth="xs"
            options={options}
        />
      </Radio>
      <br />
      <Radio
          defaultChecked={false}
          label="Google"
          name="Group2"
          value="Google"
          {...props}
      >
        <Title text="Custom Typography" />
        </Radio>
    </div>
  )
}
export default RadioChildren
