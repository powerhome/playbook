import React from 'react'
import CardTest from '../_card_test.jsx'
import { Body } from '../../'

const CardHeader = () => {
  return (
    <div>
      Default
      <CardTest>
        <CardTest.Header>
          <Body dark 
                text="Header"  />
        </CardTest.Header>
        <CardTest.Body>
          <Body text="Body" />
        </CardTest.Body>
      </CardTest>
      <br />
      Header and body padding large
      <CardTest bodyPadding="lg" 
                headerPadding="lg">
        <CardTest.Header>
          <Body dark 
                text="Header"  />
        </CardTest.Header>
        <CardTest.Body>
          <Body text="Body" />
        </CardTest.Body>
      </CardTest>
      <br />
      Only body
      <CardTest>
        <CardTest.Body>
          Body
        </CardTest.Body>
      </CardTest>
      <br />
      Only header
      <CardTest>
        <CardTest.Header>
          Header
        </CardTest.Header>
      </CardTest>
    </div>
  )
}

export default CardHeader
