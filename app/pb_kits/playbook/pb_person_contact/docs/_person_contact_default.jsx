import React from "react"
import {PersonContact} from "../../"

function PersonContactDefault() {
  return (
    <div>
      <PersonContact
        people={[
          {
            firstName: "Pauline",
            lastName: "Smith",
          },
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
            contactType: "email",
            contactValue: "email@example.com",
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
