/* @flow */

import React from 'react'
import classnames from 'classnames'

import { joinPresent, titleize } from '../utilities/text'
import { Body, Hashtag, Title } from '../'
import { globalProps } from '../utilities/globalProps.js'

type HomeAddressStreetProps = {
  address: string,
  addressCont: string,
  city: string,
  className?: string,
  dark?: boolean,
  emphasis: "street" | "city",
  homeId: number,
  houseStyle: string,
  homeUrl: string,
  state: string,
  zipcode: string,
  territory: string,
}

const HomeAddressStreet = (props: HomeAddressStreetProps) => {
  const {
    address,
    addressCont,
    city,
    className,
    dark = false,
    emphasis = 'street',
    homeId,
    homeUrl,
    houseStyle,
    state,
    zipcode,
    territory,
  } = props

  const classes = (className, dark) =>
    classnames(
      className,
      {
        'pb_home_address_street': !dark,
        'pb_home_address_street_dark': dark,
      },
      globalProps(props)
    )
  return (
    <div className={classes(className, dark)}>
      {
        <Choose>
          <When condition={emphasis == 'street'}>
            <div>
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
            </div>
          </When>
          <When condition={emphasis == 'city'}>
            <div>
              <Body color="light">
                {joinPresent([titleize(address), houseStyle], ' · ')}
              </Body>
              <Body color="light">{titleize(addressCont)}</Body>
              <div>
                <Title
                    className="pb_home_address_street_address"
                    dark={dark}
                    size={4}
                    tag="span"
                >
                  {`${titleize(city)}, ${state}`}
                </Title>
                <Body
                    color="light"
                    tag="span"
                >
                  {` ${zipcode}`}
                </Body>
              </div>
            </div>
          </When>
        </Choose>
      }

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
}

export default HomeAddressStreet
