import React from "react"
import { PhoneNumberInput } from "../../"

const PhoneNumberInputOnlyCountries = props => (
  <>
    <PhoneNumberInput id="only" onlyCountries={["us", "br"]} {...props} />
  </>
)

export default PhoneNumberInputOnlyCountries
