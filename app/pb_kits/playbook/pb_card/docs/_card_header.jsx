import React from 'react'
import { Body, Card } from '../../'

const CardHeader = () => {
  return (
    <div>
      <Card padding="none">
        <Card.Header>
          <Body
              dark
              text="Header"
          />
        </Card.Header>
        <Card.Body>
          <Body text="Body" />
        </Card.Body>
      </Card>

      <br />

      <Card padding="none">
        <Card.Header
            color="category_2"
            padding="md"
        >
          <Body
              dark
              text="Header"
          />
        </Card.Header>
        <Card.Body
            padding="lg"
        >
          <Body text="Body" />
        </Card.Body>
      </Card>
    </div>
  )
}

export default CardHeader
