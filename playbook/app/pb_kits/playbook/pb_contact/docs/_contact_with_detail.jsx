import React from 'react'
import { Contact } from '../../'

const ContactDefault = (props) => {
  return (
    <div>
      <Contact
          {...props}
          contactDetail="Cell"
          contactType="cell"
          contactValue="349-185-9988"
      />
      <Contact
          {...props}
          contactDetail="Home"
          contactValue="5555555555"
      />
      <Contact
          {...props}
          contactDetail="Work"
          contactType="work"
          contactValue="3245627482"
      />
      <Contact
          {...props}
          contactDetail="Work-Cell"
          contactType="work-cell"
          contactValue="3245627482"
      />
    </div>
  )
}

export default ContactDefault
