

import React, { useEffect } from 'react'
import { Typeahead } from '../'

type SearchProps = {
  classname: String,
  kits: Array,
  id: String,
}
const KitSearch = (props: SearchProps) => {
  const {
    classname,
    id,
    kits,
  } = props

  const handleChange = (selection) => {
    if (selection) {
      window.location = selection.value
    }
  }

  if (id === 'desktop-kit-search') {
    useEffect(() => {
      window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
          const kitSearch = document.querySelector('#desktop-kit-search #react-select-2-input')
          kitSearch === document.activeElement ? kitSearch.blur() : kitSearch.focus()
        }
      })
    })
  }

  return (
    <div>
      <Typeahead
          className={classname}
          dark={document.cookie.split('; ').includes('dark_mode=true')}
          id={id}
          onChange={handleChange}
          options={kits}
          placeholder="Search..."
      />
    </div>
  )
}

export default KitSearch
