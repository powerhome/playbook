/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'
import { titleize } from '../utilities/text.js'


import {
  Body,
  Title,
} from '../'

const dot = (houseStyle) =>
  { if (houseStyle !== undefined) {
    return "\u00b7"
  }
}

function titleize_address_cont(address_cont) {
  if (!!address_cont) {
   return titleize(address_cont);
  }
}

type HomeAddressStreetProps = {
  address: String,
  address_cont: String,
  city: String,
  className?: String,
  dark?: Boolean,
  homeId: Number,
  houseStyle: String,
  state: String,
  zipcode: String,
  territory: String,
}

const classes = (className, dark) => (
  classnames(className, {
    'pb_home_address_street': !dark,
    'pb_home_address_street_dark': dark,
  })
)


const HomeAddressStreet = ({
  address,
  address_cont,
  city,
  className,
  dark=false,
  homeId,
  houseStyle,
  state,
  zipcode,
  territory,
}: HomeAddressStreetProps) => (
  <div className={classes(className, dark)}>
    <Title
        className="pb_home_address_street_address"
        size={4}
    >
      {titleize(address)} {dot(houseStyle)} {houseStyle}
    </Title>

    <Title
        className="pb_home_address_street_address"
        size={4}
    >
      {titleize_address_cont(address_cont)}
    </Title>
    <Body color="light">
      {titleize(city)}, {state} {zipcode}
    </Body>
    <Body
        className="home-hashtag"
        tag="span"
    >
      H#{homeId}
    </Body>
    <Body
        color="light"
        tag="span"
    >
      <small>{territory}</small>
    </Body>
  </div>
)

export default HomeAddressStreet
