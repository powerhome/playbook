import React, { useState, useEffect } from 'react'

import Typeahead from '../_typeahead'
import Icon from '../../pb_icon/_icon'

const options = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
]

const TypeaheadErrorState = (props) => {
  const error = (<>
    <Icon icon="warning" /> Please make a valid selection
  </>)
  const [errorState, setErrorState] = useState(error);
  const [searchValue, setSearchValue] = useState(null);
  
  const handleOnChange = (value) => setSearchValue(value)

    useEffect(() => {
      if(searchValue) {
        setErrorState("")
      } else {
        setErrorState(error)
      }
    }, [searchValue])
  
  return (
    <Typeahead
        error={errorState}
        label="Colors"
        onChange={handleOnChange}
        options={options}
        {...props}
    />
  )
}

export default TypeaheadErrorState
