/* @flow */

import React from 'react'
import classnames from 'classnames'

import { joinPresent, titleize } from '../utilities/text'
import { Body, Hashtag, Title } from '../'

type HomeAddressStreetProps = {
  address: String,
  addressCont: String,
  city: String,
  className?: String,
  dark?: Boolean,
  homeId: Number,
  houseStyle: String,
  homeUrl: String,
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
  addressCont,
  city,
  className,
  dark = false,
  homeId,
  homeUrl,
  houseStyle,
  state,
  zipcode,
  territory,
}: HomeAddressStreetProps) => (
  <div className={classes(className, dark)}>
    <Title
        className="pb_home_address_street_address"
        dark={dark}
        size={4}
    >
      {joinPresent([titleize(address), houseStyle], ' · ')}
    </Title>

    <Title
        className="pb_home_address_street_address"
        dark={dark}
        size={4}
    >
      {titleize(addressCont)}
    </Title>
    <Body color="light">
      {`${titleize(city)}, ${state} ${zipcode}`}
    </Body>
    <If condition={homeId}>
      <Hashtag
          classname="home-hashtag"
          dark={dark}
          text={homeId}
          type="home"
          url={homeUrl || '#'}
      />
    </If>
    <Body
        color="light"
        tag="span"
    >
      <small>{territory}</small>
    </Body>
  </div>
)

export default HomeAddressStreet
