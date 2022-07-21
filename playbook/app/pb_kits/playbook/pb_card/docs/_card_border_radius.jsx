import React from 'react'
import Card from '../_card'

const CardLight = (props) => {
  return (
    <div>
      <Card
          borderRadius="rounded"
          {...props}
      >
        {'Rounded (1000px)'}
      </Card>

      <br />

      <Card
          borderRadius="xl"
          {...props}
      >
        {'Extra large (16px)'}
      </Card>

      <br />

      <Card
          borderRadius="lg"
          {...props}
      >
        {'Large (8px)'}
      </Card>

      <br />

      <Card
          borderRadius="md"
          {...props}
      >
        {'Medium (6px)'}
      </Card>

      <br />

      <Card
          borderRadius="sm"
          {...props}
      >
        {'Small (4px)'}
      </Card>

      <br />

      <Card
          borderRadius="xs"
          {...props}
      >
        {'Extra small (4px)'}
      </Card>

      <br />

      <Card
          borderRadius="none"
          {...props}
      >
        {'None'}
      </Card>
    </div>
  )
}

export default CardLight
