import React from "react"
import {Contact} from "../../"

function ContactDefault() {
  return (
    <div>
      <Contact
        contactType="cell"
        value="349-185-9988"
      />
      <Contact
        value="5555555555"
      />
      <Contact
        contactType="email"
        value="email@example.com"
      />
      <Contact
        contactType="work"
        value="3245627482"
      />
    </div>
  )
}

export default ContactDefault
