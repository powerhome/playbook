import React from 'react'
import { Contact } from '../../'

const ContactDefault = () => {
  return (
    <div>
      <Contact
          contactType="cell"
          contactValue="349-185-9988"
      />
      <Contact
          contactValue="5555555555"
      />
      <Contact
          contactType="email"
          contactValue="email@example.com"
      />
      <Contact
          contactType="work"
          contactValue="3245627482"
      />
      <Contact
          contactType="work-cell"
          contactValue="3245627482"
      />
    </div>
  )
}

export default ContactDefault
