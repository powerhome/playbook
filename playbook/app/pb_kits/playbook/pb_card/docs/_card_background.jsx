import React from 'react'
import Title from '../../pb_title/_title'
import { Body } from '../../'
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
          dark
          {...props}
      >
        <Body
            color="lighter"
            text="Dark"
            {...props}
        />
      </Card>

      <br />

      <Card>
        <Body
            text="White"
        />
      </Card>

      <br />

      <Card
          background="light"
          {...props}
      >
        <Body
            text="Light"
        />
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
          {...props}
      >
        <Body
            color="lighter"
            text="Windows"
            {...props}
        />
      </Card>

      <br />

      <Card
          background="siding"
          {...props}
      >
        <Body
            text="Siding"
            {...props}
        />
      </Card>

      <br />

      <Card
          background="doors"
          {...props}
      >
        <Body
            text="Doors"
            {...props}
        />
      </Card>

      <br />
    </div>
  )
}

export default CardBackground
