import React from 'react'

import HomeAddressStreet from '../_home_address_street'

const HomeAddressStreetEmphasis = (props) => {
  return (
    <div>
      <HomeAddressStreet
          address="70 Prospect Ave"
          addressCont="Apt M18"
          city="West Chester"
          homeId={8250263}
          homeUrl="https://powerhrg.com/"
          houseStyle="Colonial"
          state="PA"
          territory="PHL"
          zipcode="19382"
          {...props}
      />
      <br />
      <br />
      <HomeAddressStreet
          address="70 Prospect Ave"
          addressCont="Apt M18"
          city="West Chester"
          emphasis="city"
          homeId={8250263}
          homeUrl="https://powerhrg.com/"
          houseStyle="Colonial"
          state="PA"
          territory="PHL"
          zipcode="19382"
          {...props}
      />
    </div>
  )
}

export default HomeAddressStreetEmphasis
