import React from 'react'
import Card from '../_card'

const CardLight = (props) => {
  return (
    <div>
      <Card
          display="grid"
          gridAutoColumns="max-content"
          gridAutoRows="50px"
          {...props}
      >
        <Card {...props}>{'Card content'}</Card>
        <Card {...props}>{'Card content'}</Card>
      </Card>


      <Card
          display="grid"
          gridAutoRows="3fr"
          {...props}
      >
        <Card {...props}>{'Card content'}</Card>
        <Card {...props}>{'Card content'}</Card>
        <Card {...props}>{'Card content'}</Card>
      </Card>

      <Card
          display="grid"
          gridAutoRows='50px 100px 150px'
          {...props}
      >
        <Card {...props}>{'Card content'}</Card>
        <Card {...props}>{'Card content'}</Card>
        <Card {...props}>{'Card content'}</Card>
      </Card>


      <Card
          display="grid"
          gridAutoRows='30% 60%'
          {...props}
      >
        <Card {...props}>{'Card content'}</Card>
        <Card {...props}>{'Card content'}</Card>
      </Card>




    </div>
  )
}

export default CardLight
