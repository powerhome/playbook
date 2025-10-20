import React from 'react'

import Typeahead from '../_typeahead'

const options = [
  { label: 'Windows', value: 'windows' },
  { label: 'Siding', value: 'siding' },
  { label: 'Doors', value: 'doors' },
  { label: 'Roofs', value: 'roofs' },
  { label: 'Gutters', value: 'gutters' },
  { label: 'Solar', value: 'solar' },
]

const TypeaheadHideClearIndicator = (props) => {
  return (
    <>
        <Typeahead
            defaultValue={options[0]}
            hideClearIndicator
            label="Single Select (Clear Button Hidden)"
            options={options}
            placeholder="Select products..."
            {...props}
        />
        <Typeahead
            defaultValue={[options[0], options[1]]}
            hideClearIndicator
            isMulti
            label="Multi Select (Clear Button Hidden)"
            options={options}
            placeholder="Select a product..."
            {...props}
        />
    </>
  )
}

export default TypeaheadHideClearIndicator
