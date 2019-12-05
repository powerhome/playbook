import React from 'react'
import { PersonContact } from '../../'

function PersonContactMultiple() {
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
          }
        ]}
          firstName="Harvey"
          lastName="Walters"
      />
      <PersonContact
          contacts={[
          {
            contactValue: '5555555555',
          }
        ]}
          firstName="Brenda"
          lastName="Walters"
      />
    </div>
  )
}

export default PersonContactMultiple
