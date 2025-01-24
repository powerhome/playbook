import React from 'react'

import HomeAddressStreet from '../_home_address_street'

const HomeAddressStreetFormatting = (props) => {
  return (
    <HomeAddressStreet
        address="70 Prospect Ave"
        addressCont="Apt M18"
        city="West Chester"
        homeId="8250263"
        homeUrl="https://powerhrg.com/"
        houseStyle="Colonial"
        state="pa"
        territory="PHL"
        zipcode="19382"
        {...props}
    />
  )
}

export default HomeAddressStreetFormatting
