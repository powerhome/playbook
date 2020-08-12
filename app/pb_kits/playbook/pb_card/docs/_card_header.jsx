import React from 'react'
import { Body, Card, Title } from '../../'

const CardHeader = () => {
  return (
    <div>
      <Title
          size={4}
          tag="h4"
          text="Category Colors"
      />

      <br />

      <Card padding="none">
        <Card.Header>
          <Body
              dark
              text="category_1"
          />
        </Card.Header>
        <Card.Body>
          <Body text="Body" />
        </Card.Body>
      </Card>

      <br />

      <Card padding="none">
        <Card.Header
            headerColor="category_2"
        >
          <Body
              dark
              text="category_2"
          />
        </Card.Header>
        <Card.Body
            padding="md"
        >
          <Body text="Body" />
        </Card.Body>
      </Card>

      <br />

      <Title
          size={4}
          tag="h4"
          text="Product Colors"
      />

      <br />

      <Card padding="none">
        <Card.Header
            headerColor="siding"
        >
          <Body
              dark
              text="Siding"
          />
        </Card.Header>
        <Card.Body>
          <Body text="Body" />
        </Card.Body>
      </Card>

      <br />

      <Card padding="none">
        <Card.Header
            headerColor="gutters"
        >
          <Body
              dark
              text="Gutters"
          />
        </Card.Header>
        <Card.Body>
          <Body text="Body" />
        </Card.Body>
      </Card>

    </div>
  )
}

export default CardHeader
