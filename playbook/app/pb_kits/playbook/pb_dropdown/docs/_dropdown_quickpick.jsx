import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownQuickpick = (props) => {

  return (
    <div>
      <Dropdown
          label="Date Range"
          onSelect={(selectedItem) => console.log(selectedItem)}
          variant="quickpick"
          {...props}
      />
    </div>
  )
}

export default DropdownQuickpick
