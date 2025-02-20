import React from 'react'

import HomeAddressStreet from '../_home_address_street'

const HomeAddressStreetFormatting = (props) => {
  return (
    <HomeAddressStreet
        address="70 pRoSpEcT ave"
        addressCont="Apt M18"
        city="West Chester"
        homeId="8250263"
        homeUrl="https://powerhrg.com/"
        preserveCase
        state="pa"
        territory="PHL"
        zipcode="19382"
        {...props}
    />
  )
}

export default HomeAddressStreetFormatting
