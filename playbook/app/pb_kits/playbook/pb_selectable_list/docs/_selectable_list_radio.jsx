import React from 'react'
import { SelectableList } from '../..'

const SelectableListDefault = (props) => {
  // const [value, setValue] = useState()
  
  // const onChange = ({ target }) => {
  //   setValue(target.value)
  // }
  return (
    <div>
      <SelectableList variant="radio">
        <SelectableList.Item
            //className={value === "1" ? "checked_item" : ""}
            label="Small"
            name="radio"
            value="1"
            //onChange={onChange}
            {...props}
        />
        <SelectableList.Item
            //className={value === "2" ? "checked_item" : ""}
            defaultChecked
            label="Medium"
            name="radio"
            value="2"
            //onChange={onChange}
            {...props}
        />
        <SelectableList.Item
            //className={value === "3" ? "checked_item" : ""}
            label="Large"
            name="radio"
            value="3"
            //onChange={onChange}
            {...props}
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
