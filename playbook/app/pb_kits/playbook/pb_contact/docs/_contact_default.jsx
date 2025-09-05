import React from 'react'
import Contact from "../../pb_contact/_contact"

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
      <Contact
          contactType="wrong-phone"
          contactValue="2124396666"
          {...props}
      />
      <Contact
          contactType='extension'
          contactValue="1234"
          {...props}
      />
      <Contact
          contactType="international"
          contactValue="+44 7700 900461"
          {...props}
      />
    </div>
  )
}

export default ContactDefault
