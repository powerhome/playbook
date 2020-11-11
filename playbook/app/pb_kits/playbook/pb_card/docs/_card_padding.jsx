import React from 'react'
import { Card } from '../../'

const CardPadding = (props) => {
  return (
    <div>
      <Card
          {...props}
          padding="none"
      >
        {'Card content'}
      </Card>
      <br />
      <Card
          {...props}
          padding="xs"
      >
        {'Card content'}
      </Card>
      <br />
      <Card
          {...props}
          padding="sm"
      >
        {'Card content'}
      </Card>
      <br />
      <Card
          {...props}
          padding="md"
      >
        {'Card content'}
      </Card>
      <br />
      <Card
          {...props}
          padding="lg"
      >
        {'Card content'}
      </Card>
      <br />
      <Card
          {...props}
          padding="xl"
      >
        {'Card content'}
      </Card>
      <br />
    </div>
  )
}

export default CardPadding
