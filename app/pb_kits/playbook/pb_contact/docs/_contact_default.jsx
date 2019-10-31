import React from "react"
import {Contact} from "../../"

function ContactDefault() {
  return (
    <div>
      <Contact
        contactType="cell"
        contactValue="349-185-9988"
        contactDetail="John's Cell"
      />
      <Contact
        contactValue="5555555555"
        contactDetail="Home"
      />
      <Contact
        contactType="email"
        contactValue="email@example.com"
      />
      <Contact
        contactType="work"
        contactValue="3245627482"
        contactDetail="John's Work"
      />
    </div>
  )
}

export default ContactDefault
