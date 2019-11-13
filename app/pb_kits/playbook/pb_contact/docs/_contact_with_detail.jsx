import React from "react"
import {Contact} from "../../"

function ContactDefault() {
  return (
    <div>
      <Contact
        contactType="cell"
        contactValue="349-185-9988"
        contactDetail="Cell"
      />
      <Contact
        contactValue="5555555555"
        contactDetail="Home"
      />
      <Contact
        contactType="work"
        contactValue="3245627482"
        contactDetail="Work"
      />
    </div>
  )
}

export default ContactDefault
