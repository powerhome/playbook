import React from 'react'
import { PersonContact } from '../../'

function PersonContactWithDetail() {
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
            contactDetail: 'Home',
          },
          {
            contactType: 'work',
            contactValue: '3245627482',
            contactDetail: 'Work',
          },
        ]}
          firstName="Harvey"
          lastName="Walters"
      />
    </div>
  )
}

export default PersonContactWithDetail
