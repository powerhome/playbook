import React from 'react'
import CardTest from '../_card_test.jsx'
import { Body } from '../../'

const CardHeader = () => {
  return (
    <div>
      <CardTest padding="none">
        {/* <CardTest.Header>
          <Body dark 
                text="Header"  />
        </CardTest.Header> */}
        <CardTest.Body>
          <Body text="Body" />
        </CardTest.Body>
      </CardTest>

      <br />

      <CardTest padding="none">
        <CardTest.Header 
          padding="md"
          color="category_11">
          <Body dark 
                text="Header" />
        </CardTest.Header>
        <CardTest.Body
          padding="lg">
          <Body text="Body" />
        </CardTest.Body>
      </CardTest>
      
      <br />

      <CardTest highlight={{ position: 'side', color: 'windows' }}>
        Text
      </CardTest>

    </div>
  )
}

export default CardHeader
