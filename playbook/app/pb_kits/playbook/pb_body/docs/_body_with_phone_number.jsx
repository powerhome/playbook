import React from 'react'
import Body from '../_body'
import { formatPhoneNumber } from '../../utilities/phoneNumber'

export default function BodyWithPhoneNumber() {
  return (
    <>
      <Body
          text={formatPhoneNumber('5555555555')}
      />
      <Body
          color="light"
          text={formatPhoneNumber('12125551234')}
      />
      <Body
          color="lighter"
          text={formatPhoneNumber('1234', 'extension')}
      />
      <Body
          color="light"
          text={formatPhoneNumber('+44 20 7946 0958', 'international')}
      />
    </>
  )
}

