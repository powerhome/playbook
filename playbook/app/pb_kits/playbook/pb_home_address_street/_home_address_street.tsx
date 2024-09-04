import React from 'react'
import classnames from 'classnames'

import { joinPresent, titleize } from '../utilities/text'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Hashtag from '../pb_hashtag/_hashtag'
import Title from '../pb_title/_title'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GenericObject } from '../types'

type HomeAddressStreetProps = {
  aria?: { [key: string]: string },
  address: string,
  addressCont: string,
  city: string,
  className?: string,
  data?: { [key: string]: string },
  dark?: boolean,
  emphasis: "street" | "city",
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  homeId: string,
  houseStyle: string,
  homeUrl: string,
  target: string,
  newWindow: boolean,
  state: string,
  zipcode: string,
  territory: string,
}

const HomeAddressStreet = (props: HomeAddressStreetProps): React.ReactElement => {
  const {
    address,
    addressCont,
    aria = {},
    city,
    className,
    data = {},
    dark = false,
    emphasis = 'street',
    htmlOptions = {},
    homeId,
    homeUrl,
    target,
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

  const dataProps: GenericObject = buildDataProps(data)
  const ariaProps: GenericObject = buildAriaProps(aria)
  const htmlProps = buildHtmlProps(htmlOptions)

  const getTargetAttribute = () => {
    if (target && homeUrl) {
      return target
    } else if (newWindow) {
      return '_blank'
    }

    return null
  }

  return (
    <div
        className={classes(className, dark)}
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
    >
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
            target={getTargetAttribute()}
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
