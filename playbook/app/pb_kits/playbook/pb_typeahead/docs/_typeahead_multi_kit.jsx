// @flow

import React from 'react'
import { Typeahead } from '../../'

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

const TypeaheadMultiKit = (props) => {
  return (
    <>
      <Typeahead
          isMulti
          label="Badges"
          multiKit="badge"
          options={synths}
          {...props}
      />
      <Typeahead
          isMulti
          label="Small Pill"
          multiKit="smallPill"
          options={cities}
          placeholder="Add cities"
          plusIcon
          {...props}
      />
    </>
  )
}

export default TypeaheadMultiKit
