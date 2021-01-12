import React from 'react'
import Card from '../_card.jsx'

const CardLight = (props) => {
  return (
    <div>
      <Card
          borderRadius="rounded"
          {...props}
      >
        {'Rounded'}
      </Card>

      <br/>

      <Card
          borderRadius="xl"
          {...props}
      >
        {'Extra large'}
      </Card>

      <br/>

      <Card
          borderRadius="lg"
          {...props}
      >
        {'Large'}
      </Card>

      <br/>

      <Card
          borderRadius="md"
          {...props}
      >
        {'Medium'}
      </Card>

      <br/>

      <Card
          borderRadius="sm"
          {...props}
      >
        {'Small'}
      </Card>

      <br/>

      <Card
          borderRadius="xs"
          {...props}
      >
        {'Extra small'}
      </Card>

      <br/>

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
