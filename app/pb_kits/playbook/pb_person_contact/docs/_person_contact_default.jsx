import React from "react"
import {PersonContact} from "../../"

function PersonContactDefault() {
  return (
    <div>
      <PersonContact
        firstName="Pauline"
        lastName="Smith"
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
    </div>
  )
}

export default PersonContactDefault;
