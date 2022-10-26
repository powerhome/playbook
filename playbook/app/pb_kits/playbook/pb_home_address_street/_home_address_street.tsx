import React from 'react'
import classnames from 'classnames'

import { joinPresent, titleize } from '../utilities/text'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Hashtag from '../pb_hashtag/_hashtag'
import Title from '../pb_title/_title'
import { buildAriaProps, buildDataProps } from '../utilities/props'

type HomeAddressStreetProps = {
  aria?: { [key: string]: string },
  address: string,
  addressCont: string,
  city: string,
  className?: string,
  data?: { [key: string]: string },
  dark?: boolean,
  emphasis: "street" | "city",
  homeId: string,
  houseStyle: string,
  homeUrl: string,
  newWindow: boolean,
  state: string,
  zipcode: string,
  territory: string,
}

const HomeAddressStreet = (props: HomeAddressStreetProps) => {
  const {
    address,
    addressCont,
    aria = {},
    city,
    className,
    data = {},
    dark = false,
    emphasis = 'street',
    homeId,
    homeUrl,
    newWindow,
    houseStyle,
    state,
    zipcode,
    territory,
  } = props

  const classes = (className: string, dark: boolean) =>
    classnames(
      {
        'pb_home_address_street': !dark,
        'pb_home_address_street_dark': dark,
      },
      globalProps(props),
      className
    )

  const dataProps: { [key: string]: any } = buildDataProps(data)
  const ariaProps: { [key: string]: any } = buildAriaProps(aria)
  
  return (
    <div className={classes(className, dark)} {...ariaProps} {...dataProps}>
      {emphasis == 'street' && 
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
      }
      {emphasis == 'city' &&
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
      }
      {homeId &&
        <Hashtag
            classname="home-hashtag"
            dark={dark}
            marginRight="xxs"
            newWindow={newWindow}
            text={homeId}
            type="home"
            url={homeUrl || '#'}
        />
      }
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
