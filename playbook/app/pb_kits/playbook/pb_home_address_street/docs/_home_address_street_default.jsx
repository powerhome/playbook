import React from 'react'

import HomeAddressStreet from '../_home_address_street'
import Caption from '../../pb_caption/_caption'

const HomeAddressStreetDefault = (props) => {
  return (
    <>
      <Caption text="with all" />
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
      <Caption marginTop="sm"
          text="First two lines blank: without address and address cont and housestyle"
      />
      <HomeAddressStreet
          city="West Chester"
          homeId="8250263"
          homeUrl="https://powerhrg.com/"
          state="PA"
          territory="PHL"
          zipcode="19382"
          {...props}
      />
      <Caption marginTop="sm"
          text="First line half blank Second line full: with housestyle and without address and address cont"
      />
      <HomeAddressStreet
          city="West Chester"
          homeId="8250263"
          homeUrl="https://powerhrg.com/"
          houseStyle="Colonial"
          state="PA"
          territory="PHL"
          zipcode="19382"
          {...props}
      />
      <Caption marginTop="sm"
          text="First line full Second line blank: with address and housestyle and without address cont and address cont"
      />
      <HomeAddressStreet
          address="70 Prospect Ave"
          city="West Chester"
          homeId="8250263"
          homeUrl="https://powerhrg.com/"
          houseStyle="Colonial"
          state="PA"
          territory="PHL"
          zipcode="19382"
          {...props}
      />
      <Caption marginTop="sm"
          text="First line half blank Second line full: without address and with housestyle and address cont and address cont"
      />
      <HomeAddressStreet
          city="West Chester"
          homeId="8250263"
          homeUrl="https://powerhrg.com/"
          houseStyle="Colonial"
          state="PA"
          territory="PHL"
          zipcode="19382"
          {...props}
      />
      <Caption marginTop="sm"
          text="First line blank Second line full: with address cont and without address and housestyle and address cont"
      />
      <HomeAddressStreet
          addressCont="Apt M18"
          city="West Chester"
          homeId="8250263"
          homeUrl="https://powerhrg.com/"
          state="PA"
          territory="PHL"
          zipcode="19382"
          {...props}
      />
      <Caption marginTop="sm"
          text="Emphasis, Modified, Target and Formatted doc examples below and address cont"
      />
      <HomeAddressStreet
          address="70 Prospect Ave"
          city="West Chester"
          emphasis="none"
          homeId="8250263"
          homeUrl="https://powerhrg.com/"
          houseStyle="Colonial"
          marginBottom="sm"
          state="PA"
          territory="PHL"
          zipcode="19382"
          {...props}
      />
      <HomeAddressStreet
          city="West Chester"
          emphasis="city"
          homeId="8250263"
          homeUrl="https://powerhrg.com/"
          marginBottom="sm"
          state="PA"
          territory="PHL"
          zipcode="19382"
          {...props}
      />
      <HomeAddressStreet
          city="West Chester"
          emphasis="none"
          homeId="8250263"
          homeUrl="https://powerhrg.com/"
          marginBottom="sm"
          state="PA"
          territory="PHL"
          zipcode="19382"
          {...props}
      />
      <HomeAddressStreet
          address="70 Prospect Ave"
          city="West Chester"
          marginBottom="sm"
          state="PA"
          territory="PHL"
          zipcode="19382"
      />
      <HomeAddressStreet
          city="West Chester"
          homeId={8250263}
          homeUrl="https://powerhrg.com/"
          marginBottom="sm"
          state="PA"
          target="_blank"
          territory="PHL"
          zipcode="19382"
      />
      <HomeAddressStreet
          address="70 pRoSpEcT ave"
          city="West Chester"
          homeId="8250263"
          homeUrl="https://powerhrg.com/"
          preserveCase
          state="pa"
          territory="PHL"
          zipcode="19382"
      />
    </>
  )
}

export default HomeAddressStreetDefault
