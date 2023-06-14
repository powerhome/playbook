import React, { useState } from "react"
import Checkbox from "../pb_checkbox/_checkbox"
import CircleIconButton from "../pb_circle_icon_button/_circle_icon_button"

type CheckboxItemProps = {
  item: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CheckboxItem({ item, onChange }: CheckboxItemProps) {
  const [expanded, setExpanded] = useState(false)

  const handleClick = (e: ) => {
    e.stopPropagation();
    console.log("getting clicked yo")
    setExpanded(!expanded)
  }

  return (
    <div className='dropdown_item_checkbox_row'>
      <div key={expanded ? "chevron-down" : "chevron-right"}>
        <CircleIconButton
          icon={expanded ? "chevron-down" : "chevron-right"}
          className={item.children ? "" : "toggle_icon"}
          onClick={handleClick}
          variant='link'
        />
      </div>
      <Checkbox text={item.label} id={item.id}>
        <input
          checked={item.checked}
          type='checkbox'
          name={item.label}
          value={item.label}
          onChange={onChange}
        />
      </Checkbox>
    </div>
  )
}
