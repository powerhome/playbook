/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type HomeAddressCityProps = {
  address1?: String,
  city?: String,
  className?: String,
  dark?: Boolean,
  data?: String,
  homeId?: String,
  houseStyle?: String,
  id?: String,
  state?: String,
  zipCode?: String,
  
}

const HomeAddressCity = ({ address1, city, className, dark, data, homeId, houseStyle, id, state, zipCode }: HomeAddressCityProps) => (
  <div>
    {`kit content`}
  </div>
)

export default HomeAddressCity
