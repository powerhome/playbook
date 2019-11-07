import React from "react"
import {PersonContact} from "../../"

function PersonContactMultiple() {
  return (
    <div>
      <PersonContact
        firstName="Harvey"
        lastName="Walters"
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
      />
      <PersonContact
        firstName="Brenda"
        lastName="Walters"
        contacts={[
          {
            contactValue: "5555555555",
          }
        ]}
      />
    </div>
  )
}

export default PersonContactMultiple;
