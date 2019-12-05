import React from "react"
import { PersonContact } from "../../"

function PersonContactDefault() {
  return (
    <div>
      <PersonContact
          contacts={[
          {
            contactType: "email",
            contactValue: "email@example.com",
          },
          {
            contactValue: "5555555555",
          },
          {
            contactType: "work",
            contactValue: "3245627482",
          }
        ]}
          firstName="Pauline"
          lastName="Smith"
      />
    </div>
  )
}

export default PersonContactDefault
