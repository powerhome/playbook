import React, { useEffect, useState } from 'react'
import { Typeahead } from 'playbook-ui'
import { matchSorter } from 'match-sorter'

type Kit = {
  label: string,
  value: string,
}

type KitSearchProps = {
  classname: String,
  kits: Kit[],
  id: String,
}
const KitSearch = ({ classname, id, kits }: KitSearchProps) => {
  const [filteredKits, setFilteredKits] = useState(kits)

  useEffect(() => {
    if (id === 'desktop-kit-search') {
      window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
          const kitSearch = document.querySelector('#desktop-kit-search #react-select-2-input') as HTMLInputElement
          kitSearch === document.activeElement ? kitSearch.blur() : kitSearch.focus()
        }
      })
    }
  }, [ id ])

  const handleChange = (selection: any) => {
    if (selection) {
      window.location = selection.value
    }
  }

  const handleFilteredKits = (query: string) => {
    if (query) {
      const results = matchSorter(kits, query, { keys: ['label'] })
      setFilteredKits(results)
    } else {
      setFilteredKits(kits)
    }
  }

  return (
    <div>
      <Typeahead
          className={classname}
          dark={document.cookie.split('; ').includes('dark_mode=true')}
          id={id}
          onChange={handleChange}
          onInputChange={handleFilteredKits}
          options={filteredKits}
          placeholder="Search..."
      />
    </div>
  )
}

export default KitSearch
