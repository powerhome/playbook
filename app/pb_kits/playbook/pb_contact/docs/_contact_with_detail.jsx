import React from 'react'
import { Contact } from '../../'

const ContactDefault = () => {
  return (
    <div>
      <Contact
          contactDetail="Cell"
          contactType="cell"
          contactValue="349-185-9988"
      />
      <Contact
          contactDetail="Home"
          contactValue="5555555555"
      />
      <Contact
          contactDetail="Work"
          contactType="work"
          contactValue="3245627482"
      />
      <Contact
          contactDetail="Work-Cell"
          contactType="work-cell"
          contactValue="3245627482"
      />
    </div>
  )
}

export default ContactDefault
