import React from 'react'
import Title from '../../pb_title/_title'
import Card from '../_card.jsx'

const CardBackground = (props) => {
  return (
    <div>
      <Title
          {...props}
          size={4}
          tag="h4"
          text="Card Colors"
      />

      <br />

      <Card
          background="dark"
          className="dark"
          {...props}
      >
        {'Dark'}
      </Card>

      <br />

      <Card
          {...props}
      >
        {'White'}
      </Card>

      <br />

      <Card
          background="light"
          {...props}
      >
        {'Light'}
      </Card>

      <br />

      <Title
          {...props}
          size={4}
          tag="h4"
          text="Product Colors"
      />

      <br />

      <Card
          background="windows"
          className="dark"
          {...props}
      >
        {'Windows'}
      </Card>

      <br />

      <Card
          background="siding"
          {...props}
      >
        {'Siding'}
      </Card>

      <br />

      <Card
          background="doors"
          {...props}
      >
        {'Doors'}
      </Card>

      <br />
    </div>
  )
}

export default CardBackground
