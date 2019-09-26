import React from "react"
import {Input} from "../../"

function InputDefault() {
  return (
    <div>
      <Input label="First Name" placeholder="Enter first name" value="Timothy Wenhold" />
      <Input label="Last Name" placeholder="Enter last name" />
      <Input label="Phone Number" type="phone" placeholder="Enter phone number" />
      <Input label="Email Address" type="email" placeholder="Enter email address" />
      <Input label="Zip Code" type="number" placeholder="Enter zip code" />
    </div>
  )
}

export default InputDefault
