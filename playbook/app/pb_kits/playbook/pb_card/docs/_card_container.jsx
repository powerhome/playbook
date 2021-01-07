import React from 'react'
import Card from '../_card.jsx'

const CardLight = (props) => {
  return (
    <div>
      <Card
          {...props}
          maxWidth="sm"
      >
        {'Container Small'}
      </Card>
      <Card
          {...props}
          maxWidth="md"
      >
        {'Container Medium'}
      </Card>
      <Card
          {...props}
          maxWidth="lg"
      >
        {'Container Large'}
      </Card>
      <Card
          {...props}
          maxWidth="xl"
      >
        {'Container Extra Large'}
      </Card>
    </div>
  )
}

export default CardLight
