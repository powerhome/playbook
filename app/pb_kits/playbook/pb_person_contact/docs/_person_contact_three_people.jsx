import React from "react"
import {PersonContact} from "../../"

function PersonContactThreePeople() {
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
          },
          {
            firstName: "Bart",
            lastName: "Simpson"
          }
        ]}
        contacts={[
          {
            contactType: "work",
            contactValue: "3245627482",
          }
        ]}
      />
    </div>
  )
}

export default PersonContactThreePeople;
