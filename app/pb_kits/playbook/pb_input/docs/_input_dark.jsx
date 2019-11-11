import React from "react"
import {Input} from "../../"

function InputDark() {
  return (
    <div>
      <Input label="First Name" placeholder="Enter first name" value="Timothy Wenhold" dark={true} />
      <Input label="Last Name" placeholder="Enter last name" dark={true} />
      <Input label="Phone Number" type="phone" placeholder="Enter phone number" dark={true} />
      <Input label="Email Address" type="email" placeholder="Enter email address" dark={true} />
      <Input label="Zip Code" type="number" placeholder="Enter zip code" dark={true} />
    </div>
  )
}

export default InputDark
