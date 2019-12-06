import React from "react"
import {TextInput} from "../../"

function TextInputDefault() {
  return (
    <div>
      <TextInput label="First Name" placeholder="Enter first name" value="Timothy Wenhold" />
      <TextInput label="Last Name" placeholder="Enter last name" />
      <TextInput label="Phone Number" type="phone" placeholder="Enter phone number" />
      <TextInput label="Email Address" type="email" placeholder="Enter email address" />
      <TextInput label="Zip Code" type="number" placeholder="Enter zip code" />
    </div>
  )
}

export default TextInputDefault
