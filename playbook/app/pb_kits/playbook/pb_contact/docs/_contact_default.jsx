import React from 'react'
import { Contact } from '../../'

const ContactDefault = (props) => {
  return (
    <div>
      <Contact
          {...props}
          contactType="cell"
          contactValue="349-185-9988"
      />
      <Contact
          {...props}
          contactValue="5555555555"
      />
      <Contact
          {...props}
          contactType="email"
          contactValue="email@example.com"
      />
      <Contact
          {...props}
          contactType="work"
          contactValue="3245627482"

      />
      <Contact
          {...props}
          contactType="work-cell"
          contactValue="3245627482"
      />
    </div>
  )
}

export default ContactDefault
