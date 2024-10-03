import React from 'react'
import Card from '../_card'

const CardLight = (props) => {
  return (
    <div>
      <Card 
          height="100vh"
          margin="xl"
          {...props}
      >{'Card content'}</Card>
    </div>
  )
}

export default CardLight
