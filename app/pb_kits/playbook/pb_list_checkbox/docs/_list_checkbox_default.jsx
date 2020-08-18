import React from 'react'
import { ListCheckbox, ListCheckboxItem } from '../../'

const ListCheckboxDefault = () => (
  <div>
    <ListCheckbox>
      <ListCheckboxItem text="Unchecked"/>
      <ListCheckboxItem text="Hover"/>
      <ListCheckboxItem text="Selected" checked/>
      <ListCheckboxItem text="Last"/>
    </ListCheckbox>
  </div>
)

export default ListCheckboxDefault
