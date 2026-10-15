import React from 'react'
import Dropdown from '../_dropdown'

const DropdownOptionCreation = () => {
  const options = [{ id: 'existing', label: 'Existing tag', value: 'existing' }]

  return (
    <>
      <Dropdown
          allowOptionCreation
          label="Grid Alignment Group"
          marginBottom="md"
          name="gridAlignmentGroup"
          options={options}
      />
      <Dropdown
          allowOptionCreation
          label="Tags"
          multiSelect
          name="tags[]"
          options={options}
      />
    </>
  )
}

export default DropdownOptionCreation
