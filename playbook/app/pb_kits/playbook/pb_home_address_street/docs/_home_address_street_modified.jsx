import React from 'react'

import HomeAddressStreet from '../_home_address_street'

const HomeAddressStreetModified = (props) => {
  return (
    <HomeAddressStreet
        address="70 Prospect Ave"
        city="West Chester"
        state="PA"
        territory="PHL"
        zipcode="19382"
        {...props}
    />
  )
}

export default HomeAddressStreetModified
