import React from 'react'
import { Contact } from '../../'

const ContactDefault = (props) => {
  return (
    <div>
      <Contact
          contactType="cell"
          contactValue="349-185-9988"
          {...props}
      />
      <Contact
          contactValue="5555555555"
          {...props}
      />
      <Contact
          contactType="email"
          contactValue="email@example.com"
          {...props}
      />
      <Contact
          contactType="work"
          contactValue="3245627482"
          {...props}
      />
      <Contact
          contactType="work-cell"
          contactValue="3245627482"
          {...props}
      />
    </div>
  )
}

export default ContactDefault
