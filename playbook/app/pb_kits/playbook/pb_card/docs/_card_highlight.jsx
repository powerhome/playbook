import React from 'react'
import { Card } from '../../'

const CardHighlight = (props) => {
  return (
    <div>
      <Card
          {...props}
          highlight={{ position: 'side', color: 'windows' }}
      >
        {'Card content'}
      </Card>

      <br />

      <Card
          {...props}
          highlight={{ position: 'top', color: 'warning' }}
      >
        {'Card content'}
      </Card>

      <br />

      <Card
          {...props}
          highlight={{ position: 'side', color: 'category_2' }}
      >
        {'Card content'}
      </Card>
    </div>
  )
}

export default CardHighlight
