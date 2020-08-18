import React from 'react'
import { ListCheckbox } from '../../'
import ListCheckboxItem from '../_list_checkbox_item'

const ListCheckboxDefault = () => (
  <div>
    <ListCheckbox>
      <ListCheckboxItem text="Unchecked"/>
      <ListCheckboxItem text="Hover"/>
      <ListCheckboxItem text="Selected"/>
      <ListCheckboxItem text="Last"/>
    </ListCheckbox>
  </div>
)

export default ListCheckboxDefault
