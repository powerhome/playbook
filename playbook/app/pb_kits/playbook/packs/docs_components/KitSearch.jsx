import React from 'react'
import { Typeahead } from '../../'

const KitSearch = (props) => {

  const { kits } = props
  console.log(kits)

  const handleChange = (selection) => {
    console.log(selection.value)
    window.location = selection.value
  }

  return (
    <div>
      <Typeahead
        label="Kits"
        options={kits}
        onChange={handleChange}
      />
    </div>
  )
}

export default KitSearch
