import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownQuickPick = (props) => {

  return (
    <div>
      <Dropdown
          label="Quick Pick"
          variant="quickpick"
          {...props}
      />
    </div>
  )
}

export default DropdownQuickPick
