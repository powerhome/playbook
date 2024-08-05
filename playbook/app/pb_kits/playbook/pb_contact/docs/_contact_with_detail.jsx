import React from 'react'
import { Contact } from 'playbook-ui'

const ContactDefault = (props) => {
  return (
    <div>
      <Contact
          contactDetail="Cell"
          contactType="cell"
          contactValue="349-185-9988"
          {...props}
      />
      <Contact
          contactDetail="Home"
          contactValue="5555555555"
          {...props}
      />
      <Contact
          contactDetail="Work"
          contactType="work"
          contactValue="3245627482"
          {...props}
      />
      <Contact
          contactDetail="Work-Cell"
          contactType="work-cell"
          contactValue="3245627482"
          {...props}
      />
      <Contact
          contactDetail="Ext"
          contactType='extension'
          contactValue="1234"
          {...props}
      />
    </div>
  )
}

export default ContactDefault
