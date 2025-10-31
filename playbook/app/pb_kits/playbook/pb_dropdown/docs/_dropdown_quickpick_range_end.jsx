import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownQuickpickRangeEnd = (props) => {

  return (
    <div>
      <Dropdown
          label="Date Range"
          onSelect={(selectedItem) => console.log(selectedItem)}
          rangeEndsToday
          variant="quickpick"
          {...props}
      />
    </div>
  )
}

export default DropdownQuickpickRangeEnd
