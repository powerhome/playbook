import React from "react"
import {PersonContact} from "../../"

function PersonContactSinglePerson() {
  return (
    <div>
      <PersonContact
        people={[
          {
            firstName: "Harvey",
            lastName: "Walters"
          }
        ]}
        contacts={[
          {
            contactType: "email",
            contactValue: "email@example.com"
          },
          {
            contactValue: "5555555555",
          },
          {
            contactType: "work",
            contactValue: "3245627482",
          }
        ]}
      />
    </div>
  )
}

export default PersonContactSinglePerson;
