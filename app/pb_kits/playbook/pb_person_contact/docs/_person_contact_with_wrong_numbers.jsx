import React from 'react'
import { PersonContact } from '../../'

const PersonContactWithWrongNumbers = () => {
  return (
    <>
      <PersonContact
          key="person-contact-1"
          contacts={[
            {
              contactType: 'email',
              contactValue: 'email@example.com',
            },
            {
              contactValue: '5555555555',
            },
            {
              contactType: 'wrong-phone',
              contactValue: '3245627482',
            },
            {
              contactType: 'phone',
              contactValue: '3048615385',
            },
          ]}
          firstName="Pauline"
          lastName="Smith"
      />
    </>
  )
}

export default PersonContactWithWrongNumbers
