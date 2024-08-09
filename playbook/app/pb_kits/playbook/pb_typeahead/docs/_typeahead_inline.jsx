import React from 'react'

import Typeahead from '../_typeahead'

const synths = [
  { label: 'Oberheim', value: 'OBXa' },
  { label: 'Moog', value: 'Minimoog' },
  { label: 'Roland', value: 'Juno' },
  { label: 'Korg', value: 'MS-20' },
]

const cities = [
  { label: 'Budapest', value: 'Hungary' },
  { label: 'Singapore', value: 'Singapore' },
  { label: 'Oslo', value: 'Norway' },
  { label: 'Lagos', value: 'Nigeria' },
]

const TypeaheadInline = (props) => {
  return (
    <>
      <Typeahead
          inline
          isMulti
          label="Synths"
          options={synths}
          {...props}
      />
      <Typeahead
          inline
          isMulti
          label="Placeholder Plus Icon"
          options={cities}
          placeholder="Add cities"
          plusIcon
          {...props}
      />
    </>
  )
}

export default TypeaheadInline
