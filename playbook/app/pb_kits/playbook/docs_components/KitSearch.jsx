import React, { useEffect } from 'react'
import { Typeahead } from '../'

const KitSearch = (props) => {
  const { kits } = props

  const handleChange = (selection) => {
    window.location = selection.value
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'k') {
        const kitSearch = document.querySelector('#kit-search #react-select-2-input')
        kitSearch === document.activeElement ? kitSearch.blur() : kitSearch.focus()
      }
    })
  })

  return (
    <div>
      <Typeahead
          className="kit-search"
          id="kit-search"
          placeholder="Search"
          onChange={handleChange}
          options={kits}
      />
    </div>
  )
}

export default KitSearch
