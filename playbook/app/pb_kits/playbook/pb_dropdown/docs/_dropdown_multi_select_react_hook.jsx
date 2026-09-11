import React from 'react'

import Dropdown from '../_dropdown'
import Title from '../../pb_title/_title'
import { useForm } from 'react-hook-form'

const options = [
  { label: 'United States', value: 'unitedStates', id: 'us' },
  { label: 'United Kingdom', value: 'unitedKingdom', id: 'gb' },
  { label: 'Canada', value: 'canada', id: 'ca' },
  { label: 'Pakistan', value: 'pakistan', id: 'pk' },
  { label: 'India', value: 'india', id: 'in' },
  { label: 'Australia', value: 'australia', id: 'au' },
  { label: 'New Zealand', value: 'new Zealand', id: 'nz' },
  { label: 'Italy', value: 'italy', id: 'it' },
  { label: 'Spain', value: 'spain', id: 'es' },
]

const DropdownMultiSelectReactHook = (props) => {
  const { register, watch } = useForm()

  const selectedCountries = watch('countries')

  return (
    <>
      <Dropdown
          label="Countries"
          multiSelect
          options={options}
          {...props}
          {...register('countries')}
      />
      <Title
          marginTop="sm"
          size={4}
          text="Selected Countries"
      />
      {selectedCountries && selectedCountries.map(country => (
        <p key={country.id}>{`${country.label} - ${country.value}`}</p>
      ))}
    </>
  )
}

export default DropdownMultiSelectReactHook
