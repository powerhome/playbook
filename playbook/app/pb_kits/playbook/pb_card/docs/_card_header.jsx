import React from 'react'
import { Body, Card, Title } from '../../'

const CardHeader = (props) => {
  return (
    <div>
      <Title
          {...props}
          size={4}
          tag="h4"
          text="Category Colors"
      />

      <br />

      <Card
          {...props}
          padding="none"
      >
        <Card.Header>
          <Body
              {...props}
              text="category_1"
          />
        </Card.Header>
        <Card.Body>
          <Body
              {...props}
              text="Body"
          />
        </Card.Body>
      </Card>

      <br />

      <Card
          {...props}
          padding="none"
      >
        <Card.Header
            headerColor="category_2"
        >
          <Body
              {...props}
              text="category_2"
          />
        </Card.Header>
        <Card.Body
            padding="md"
        >
          <Body
              {...props}
              text="Body"
          />
        </Card.Body>
      </Card>

      <br />

      <Title
          {...props}
          size={4}
          tag="h4"
          text="Product Colors"
      />

      <br />

      <Card
          {...props}
          padding="none"
      >
        <Card.Header
            headerColor="siding"
        >
          <Body
              {...props}
              text="Siding"
          />
        </Card.Header>
        <Card.Body>
          <Body
              {...props}
              text="Body"
          />
        </Card.Body>
      </Card>

      <br />

      <Card
          {...props}
          padding="none"
      >
        <Card.Header
            headerColor="gutters"
        >
          <Body
              {...props}
              text="Gutters"
          />
        </Card.Header>
        <Card.Body>
          <Body
              {...props}
              text="Body"
          />
        </Card.Body>
      </Card>

    </div>
  )
}

export default CardHeader
