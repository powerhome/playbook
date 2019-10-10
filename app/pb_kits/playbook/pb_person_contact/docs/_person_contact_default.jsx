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
            contact_type: "email",
            value: "email@example.com"
          },
          {
            value: "5555555555",
          },
          {
            contact_type: "email",
            value: "email@example.com",
          },
          {
            contact_type: "work",
            value: "3245627482",
          }
        ]}
      />
    </div>
  )
}

export default PersonContactDefault;
