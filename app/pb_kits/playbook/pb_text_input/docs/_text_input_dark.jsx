import React from "react"
import {TextInput} from "../.."

function TextInputDark() {
  return (
    <div>
      <TextInput label="First Name" placeholder="Enter first name" value="Timothy Wenhold" dark />
      <TextInput label="Last Name" placeholder="Enter last name" dark />
      <TextInput label="Phone Number" type="phone" placeholder="Enter phone number" dark/>
      <TextInput label="Email Address" type="email" placeholder="Enter email address" dark />
      <TextInput label="Zip Code" type="number" placeholder="Enter zip code" dark />
    </div>
  )
}

export default TextInputDark
