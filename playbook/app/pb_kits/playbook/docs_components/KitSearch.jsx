import React, { useEffect } from 'react'
import { Typeahead } from '../'

const KitSearch = (props) => {

  const { kits } = props
  console.log(kits)

  const handleChange = (selection) => {
    console.log(selection.value)
    window.location = selection.value
  }

  useEffect(()=> {
    window.addEventListener('keydown', (e)=>{
      if(e.ctrlKey && e.key === 'k') {
        const kitSearch = document.querySelector('#kit-search #react-select-2-input')
        kitSearch === document.activeElement ? kitSearch.blur() : kitSearch.focus()
      }
    })
  })

  return (
    <div>
      <Typeahead
        id="kit-search"
        label="Kits"
        options={kits}
        onChange={handleChange}
      />
    </div>
  )
}

export default KitSearch
