import React from 'react'

import Dropdown from '../_dropdown'
import Title from '../../pb_title/_title'
import { useForm } from 'react-hook-form'

const options = [
  { label: 'United States', value: 'unitedStates', id: 'us' },
  { label: 'Canada', value: 'canada', id: 'ca' },
  { label: 'Pakistan', value: 'pakistan', id: 'pk' },
]

const DropdownReactHook = (props) => {
  const { register, watch } = useForm()

  const selectedCountry = watch('country')

  return (
    <>
      <Dropdown
          label="Countries"
          options={options}
          {...props}
          {...register('country')}
      />
      <Title
          marginTop="sm"
          size={4}
          text="Selected Country"
      />
      <p>{selectedCountry && `${selectedCountry.label} - ${selectedCountry.value}`}</p>
    </>
  )
}

export default DropdownReactHook
