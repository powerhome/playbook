import React from 'react'
import { Card } from '../../'

const CardShadow = (props) => {
  return (
    <div>
      <Card
          {...props}
          shadow="none"
      >
        {'Card content'}
      </Card>
      <br />
      <Card
          {...props}
          shadow="deep"
      >
        {'Card content'}
      </Card>
      <br />
      <Card
          {...props}
          shadow="deeper"
      >
        {'Card content'}
      </Card>
      <br />
      <Card
          {...props}
          shadow="deepest"
      >
        {'Card content'}
      </Card>
      <br />
    </div>
  )
}

export default CardShadow
