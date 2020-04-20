import React from 'react'
import { Body, Card } from '../../'

const CardHeader = () => {
  return (
    <div>
      <Card padding="none">
        <Card.Body>
          <Body text="Body" />
        </Card.Body>
      </Card>

      <br />

      <Card padding="none">
        <Card.Header
            color="category_11"
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
      <br />

      <Card
          highlight={{ position: 'side', color: 'windows' }}
      >
        {'Text'}
      </Card>

    </div>
  )
}

export default CardHeader
