import React from 'react'
import { PersonContact } from '../../'

const PersonContactDefault = (props) => {
  return (
    <div>
      <PersonContact
          contacts={[
          {
            contactType: 'email',
            contactValue: 'email@example.com',
          },
          {
            contactValue: '5555555555',
          },
          {
            contactType: 'work',
            contactValue: '3245627482',
          },
        ]}
          firstName="Pauline"
          lastName="Smith"
          {...props}
      />
    </div>
  )
}

export default PersonContactDefault
