import React, { useState } from 'react'

import Dropdown from '../../pb_dropdown/_dropdown'
import Caption from '../../pb_caption/_caption'

const DropdownDisabledOption = (props) => {
  const [selectedOption, setSelectedOption] = useState()

  const options = [
    { label: 'Available Option', value: 'available', id: 'available-option' },
    { label: 'Coming Soon', value: 'coming-soon', id: 'coming-soon', disabled: true },
    { label: 'Another Available', value: 'another-available', id: 'another-available' },
    { label: 'Locked Feature', value: 'locked-feature', id: 'locked-feature', disabled: true },
  ]

  return (
    <div>
      <Caption
          text="Select an option. Disabled options remain visible but cannot be selected."
      />
      <Dropdown
          onSelect={(selectedItem) => setSelectedOption(selectedItem)}
          options={options}
          placeholder="Choose an option"
          {...props}
      />
      {selectedOption && (
        <Caption
            marginTop="xs"
            text={`Selected: ${selectedOption.label}`}
        />
      )}
    </div>
  )
}

export default DropdownDisabledOption