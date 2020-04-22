import React from 'react'
import { Card } from '../../'

const CardHighlight = () => {
  return (
    <div>
      <Card highlight={{ position: 'side', color: 'windows' }}>
        {'Card content'}
      </Card>

      <br />

      <Card highlight={{ position: 'top', color: 'warning' }}>
        {'Card content'}
      </Card>

      <br />

      <Card highlight={{ position: 'side', color: 'category_2' }}>
        {'Card content'}
      </Card>
    </div>
  )
}

export default CardHighlight
