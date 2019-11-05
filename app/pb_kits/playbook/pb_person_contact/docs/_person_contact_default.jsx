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
            contactValue: "email@example.com",
            contactDetail: "Pauline's Email",
          },
          {
            contactValue: "5555555555",
            contactDetail: "Home",
          },
          {
            contactType: "email",
            contactValue: "email@example.com",
          },
          {
            contactType: "work",
            contactValue: "3245627482",
            contactDetail: "Harvey's Work"
          }
        ]}
      />
    </div>
  )
}

export default PersonContactDefault;
