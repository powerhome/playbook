import React from 'react'
import { HomeAddressStreet } from '../../'

const HomeAddressStreetEmphasis = () => {
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
      />
    </div>
  )
}

export default HomeAddressStreetEmphasis
