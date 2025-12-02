import React from 'react'

import HomeAddressStreet from '../_home_address_street'

const HomeAddressStreetDefault = (props) => {
  return (
    <HomeAddressStreet
        address="70 Prospect Ave"
        addressCont="Apt M18"
        city="West Chester"
        homeId="8250263"
        homeUrl="https://powerhrg.com/"
        houseStyle="Colonial"
        state="PA"
        territory="PHL"
        zipcode="19382"
        {...props}
    />
  )
}

export default HomeAddressStreetDefault
