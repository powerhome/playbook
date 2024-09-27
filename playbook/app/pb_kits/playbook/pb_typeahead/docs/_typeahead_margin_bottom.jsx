import React from 'react'

import Typeahead from '../_typeahead'

const options = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
]

const TypeaheadMarginBottom = (props) => {
  return (
    <>
      <Typeahead
          label="None"
          marginBottom="none"
          options={options}
          {...props}
      />
      <Typeahead
          label="XXS"
          marginBottom="xxs"
          options={options}
          {...props}
      />   
      <Typeahead
          label="XS"
          marginBottom="xs"
          options={options}
          {...props}
      />   
      <Typeahead
          label="Default - SM"
          options={options}
          {...props}
      />   
      <Typeahead
          label="MD"
          marginBottom="md"
          options={options}
          {...props}
      />
      <Typeahead
          label="LG"
          marginBottom="lg"
          options={options}
          {...props}
      />
      <Typeahead
          label="XL"
          marginBottom="xl"
          options={options}
          {...props}
      />
    </>
  )
}

export default TypeaheadMarginBottom