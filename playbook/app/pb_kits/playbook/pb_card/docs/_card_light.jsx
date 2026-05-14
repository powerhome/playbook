import React from 'react'
import Card from '../_card'

const CardLight = (props) => {
  return (
    <div>
      <Card 
          display="grid"
          // gridAutoFlow="column"
          gridAutoRows="50px"
          {...props}
      >
        <Card {...props}>{'Card content'}</Card>
        <Card {...props}>{'Card content'}</Card>
      </Card>
      
    </div>
  )
}

export default CardLight
