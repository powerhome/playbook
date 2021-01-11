import React from 'react'
import { PersonContact } from '../../'

const PersonContactMultiple = (props) => {
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
          firstName="Harvey"
          lastName="Walters"
          {...props}
      />
      <PersonContact
          contacts={[
          {
            contactValue: '5555555555',
          },
        ]}
          firstName="Brenda"
          lastName="Walters"
          {...props}
      />
    </div>
  )
}

export default PersonContactMultiple
