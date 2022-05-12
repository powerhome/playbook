import React from 'react'
import Card from '../_card'

const CardSelected = (props) => {
  return (
    <div>
      <Card {...props}>{'Card content'}</Card>
      <br />
      <Card
          {...props}
          selected
      >
        {'Card content'}
      </Card>
    </div>
  )
}

export default CardSelected
