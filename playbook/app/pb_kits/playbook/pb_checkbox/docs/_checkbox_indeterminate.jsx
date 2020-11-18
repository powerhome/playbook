import React, { useState } from 'react'
import { Checkbox, Table } from '../..'

const CheckboxIndeterminate = (props) => {
  const [checkboxes, setCheckboxes] = useState([false, false])
  const [isIndeterminate, toggleIndeterminate] = useState(false)

  const toggleAll = (event) => {
    if (event) {
      const checked = event.currentTarget.checked
      const updatedCheckboxes = checkboxes[0] === checkboxes[1] ? [!checkboxes[0], !checkboxes[1]] : [checked, checked]
      setCheckboxes(updatedCheckboxes)
      toggleIndeterminate(false)
    }
  }

  const updateCheckbox = (event) => {
    if (event){
      const updatedCheckboxes = event.currentTarget.name === 'checkbox-one' ? [!checkboxes[0], checkboxes[1]] : [checkboxes[0], !checkboxes[1]]
      setCheckboxes(updatedCheckboxes)
      toggleIndeterminate(updatedCheckboxes[0] !== updatedCheckboxes[1])
    }
  }

  return (
    <div>
      <Table
          disableHover
          size="sm"
          {...props}
      >
        <thead>
          <tr>
            <th>
              <Checkbox
                  {...props}
                  checked={isIndeterminate ? true : checkboxes[0]}
                  indeterminate={isIndeterminate}
                  name="checkbox-name"
                  onChange={(e) => toggleAll(e)}
                  text={checkboxes[0] === true ? 'Deselect All' : 'Select All'}
                  value="check-box value"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Checkbox
                  {...props}
                  checked={checkboxes[0]}
                  name="checkbox-one"
                  onChange={(e) => updateCheckbox(e)}
                  text="Cookies"
                  value="check-box value"
              />
            </td>
          </tr>
          <tr>
            <td>
              <Checkbox
                  {...props}
                  checked={checkboxes[1]}
                  name="checkbox-two"
                  onChange={(e) => updateCheckbox(e)}
                  text="Donuts"
                  value="check-box value"
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default CheckboxIndeterminate
