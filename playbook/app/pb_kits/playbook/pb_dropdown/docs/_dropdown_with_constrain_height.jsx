import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownWithConstrainHeight = (props) => {
  // Create a long list of options to demonstrate height constraint
  const options = Array.from({ length: 30 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: `option_${i + 1}`,
    id: `opt_${i + 1}`
  }))

  return (
    <>
      <Dropdown
          data={{ testid: "dropdown-no-constrain" }}
          label="Without Constrain Height (Default)"
          marginBottom="md"
          options={options}
          {...props}
      />

      <Dropdown
          constrainHeight
          data={{ testid: "dropdown-constrain" }}
          label="With Constrain Height"
          options={options}
          {...props}
      />
    </>
  )
}

export default DropdownWithConstrainHeight
