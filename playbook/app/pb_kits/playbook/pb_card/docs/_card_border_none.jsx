import React from 'react'
import Card from '../_card.jsx'

const CardBorderNone = (props) => {
  return (

    <Card
        {...props}
        borderNone
    >
      {'Card content'}
    </Card>

  )
}

export default CardBorderNone
