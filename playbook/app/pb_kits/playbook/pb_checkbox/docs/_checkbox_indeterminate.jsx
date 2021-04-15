import React, { useState } from 'react'
import { Checkbox, Table } from '../..'

const CheckboxIndeterminate = (props) => {
  const [checkboxes, setCheckboxes] = useState([
    { name: 'Coffee', checked: false },
    { name: 'Ice Cream', checked: false },
    { name: 'Chocolate', checked: true },
  ])

  const isAllChecked = !checkboxes.find((checkbox) => !checkbox.checked)
  const isNoneChecked = !checkboxes.find((checkbox) => checkbox.checked)

  const processCheckboxes = (checked) =>
    checkboxes.slice(0).map((checkbox) => {
      checkbox.checked = checked
      return checkbox
    })

  const onToggleAll = () => {
    setCheckboxes(
      isNoneChecked ? processCheckboxes(true) : processCheckboxes(false)
    )
  }

  const updateCheckboxes = (checkbox, index) => {
    const newCheckboxes = checkboxes.slice(0)
    newCheckboxes[index].checked = !checkbox.checked
    setCheckboxes(newCheckboxes)
  }

  return (
    <Table
        container={false}
        size="md"
    >
      <thead>
        <tr>
          <th>
            <Checkbox
                checked={isAllChecked}
                indeterminate={!isAllChecked && !isNoneChecked}
                name="checkbox-name"
                onChange={onToggleAll}
                text={isNoneChecked ? 'Check All' : 'Uncheck All'}
                value="check-box value"
                {...props}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {checkboxes.map((checkbox, index) => (
          <tr key={index}>
            <td>
              <Checkbox
                  checked={checkbox.checked}
                  name={checkbox.name}
                  onChange={() => {
                    updateCheckboxes(checkbox, index)
                  }}
                  text={checkbox.name}
                  value="check-box value"
                  {...props}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default CheckboxIndeterminate
