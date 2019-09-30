import React from "react"
import SelectableIcon from "../_selectable_icon.jsx"

function SelectableIconDefault() {
  return (
    <div>
      <SelectableIcon
        icon="cog"
        label="Title"
      />

      <br/><br/>

      <SelectableIcon
        icon="calendar"
        label="Title"
        checked="true"
      />
    </div>
  )
}

export default SelectableIconDefault;
