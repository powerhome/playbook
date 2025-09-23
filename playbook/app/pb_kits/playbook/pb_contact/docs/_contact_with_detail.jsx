import React from 'react'
import Contact from "../../pb_contact/_contact"

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
      <Contact
          contactDetail="International"
          contactType="international"
          contactValue="+44 7700 900461"
          {...props}
      />
    </div>
  )
}

export default ContactDefault
