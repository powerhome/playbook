import React from "react"
import { Contact } from "../../"

function ContactDefault() {
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
    </div>
  )
}

export default ContactDefault
