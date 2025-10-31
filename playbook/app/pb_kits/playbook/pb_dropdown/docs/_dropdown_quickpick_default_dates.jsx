import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownQuickpickDefaultDates = (props) => {

  return (
    <div>
      <Dropdown
          defaultValue="This Year"
          label="Date Range"
          variant="quickpick"
          {...props}
      />
    </div>
  )
}

export default DropdownQuickpickDefaultDates
