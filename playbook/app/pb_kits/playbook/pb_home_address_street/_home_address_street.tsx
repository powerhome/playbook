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
  preserveCase?: boolean,
  emphasis: "street" | "city" | "none",
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
    preserveCase = false,
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
    } else {
      return '_self'
    }

    return null
  }

  const formatStreetAdr = (address: string): string => preserveCase ? address : titleize(address)

  const uppercaseState = state?.toUpperCase() ?? ''

  const fields = [address, addressCont, city, homeId, homeUrl, houseStyle, state, territory, zipcode]
  const hasAllEmptyProps = fields.every(field => field === undefined || field === null || field === '')

  return (
    <div
        className={classes(className, dark)}
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
    >
      {hasAllEmptyProps && '—'}
      {emphasis == 'street' && !hasAllEmptyProps &&
        <div>
          {(address || houseStyle) && (
            <Title
                className="pb_home_address_street_address"
                dark={dark}
                size={4}
            >
              {joinPresent([formatStreetAdr(address), houseStyle], ' · ')}
            </Title>
          )}
          {addressCont && (
            <Title
                className="pb_home_address_street_address"
                dark={dark}
                size={4}
            >
              {titleize(addressCont)}
            </Title>
          )}
          <Body color="light">
            {`${city ? `${titleize(city)}, ` : ''}${uppercaseState}${zipcode ? ` ${zipcode}` : ''}`}
          </Body>
        </div>
      }
      {emphasis == 'city' && !hasAllEmptyProps &&
        <div>
          {(address || houseStyle) && (
            <Body color="light">
              {joinPresent([formatStreetAdr(address), houseStyle], ' · ')}
            </Body>
          )}
          {addressCont && (
            <Body color="light">{titleize(addressCont)}</Body>
          )}
          <div>
            <Title
                className="pb_home_address_street_address"
                dark={dark}
                size={4}
                tag="span"
            >
              {`${city ? `${titleize(city)}, ` : ''}${uppercaseState}`}
            </Title>
            <Body
                color="light"
                tag="span"
            >
              {` ${zipcode ?? ''}`}
            </Body>
          </div>
        </div>
      }
      {emphasis == 'none' && !hasAllEmptyProps &&
        <div>
          {(address || houseStyle) && (
            <Body dark={dark}>
              {joinPresent([formatStreetAdr(address), houseStyle], ' · ')}
            </Body>
          )}
          {addressCont && (
            <Body dark={dark}>{formatStreetAdr(addressCont)}</Body>
          )}
          <div>
            <Body
                color="light"
                dark={dark}
              >
            {`${city ? `${titleize(city)}, ` : ''}${uppercaseState}${zipcode ? ` ${zipcode}` : ''}`}
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
