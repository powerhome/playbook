import React from 'react'

import Person from '../_person'

const PersonDefault = (props) => {
  return (
    <Person
        firstName="Kyle"
        lastName="Fadigan"
        {...props}
    />
  )
}

export default PersonDefault
