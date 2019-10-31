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
            contactValue: "email@example.com",
            contactDetail: "Harvey's Email",
          },
          {
            contactValue: "5555555555",
            contactDetail: "Home",
          },
          {
            contactType: "work",
            contactValue: "3245627482",
            contactDetail: "Harvey's Work",
          }
        ]}
      />
    </div>
  )
}

export default PersonContactSinglePerson;
