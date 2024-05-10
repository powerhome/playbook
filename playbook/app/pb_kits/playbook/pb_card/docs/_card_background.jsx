import React from 'react'
import Title from '../../pb_title/_title'
import { Body } from '../../'
import Card from '../_card'

const CardBackground = (props) => {
  return (
    <div>
      <Title
          {...props}
          marginBottom="sm"
          size={4}
          tag="h4"
          text="Card Colors"
      />
      <Card
          background="dark"
          dark
          marginBottom="sm"
          {...props}
      >
        <Body
            dark
            text="Dark"
        />
      </Card>

      <Card
          marginBottom="sm"
          {...props}
      >
        <Body
            text="White / Default"
            {...props}    
        />
      </Card>


      <Card
          background="light"
          marginBottom="sm"
          {...props}
      >
        <Body text="Light"/>
      </Card>

    
      <Title
          {...props}
          marginBottom="sm"
          size={4}
          tag="h4"
          text="Product Colors"
      />

      <Card
          background="product_1_background"
          marginBottom="sm"
          {...props}
      >
        <Body
            dark
            text="Product 1 Background"
        />
      </Card>

      

      <Card 
          background="product_7_highlight" 
          marginBottom="sm"
          {...props}
      >
        <Body 
            dark
            text="Product 7 Highlight"
        />
      </Card>

      

      <Card 
          background="product_2_highlight" 
          marginBottom="sm"
          {...props}
      >
        <Body
            dark
            text="Product 2 Highlight"    
        />
      </Card>


      <Title
          {...props}
          marginBottom="sm"
          size={4}
          tag="h4"
          text="Subtle Status Colors"
      />

      <Card
          background="success_subtle"
          marginBottom="sm"
          {...props}
      >
        <Body
            text="Success Subtle"
            {...props}  
        />
      </Card>

      <Card
          background="warning_subtle"
          marginBottom="sm"
          {...props}
      >
        <Body
            text="Warning Subtle"
            {...props}
        />
      </Card>

      <Card
          background="info_subtle"
          marginBottom="sm"
          {...props}
      >
        <Body
            text="Info Subtle"
            {...props}
        />
      </Card>
    </div>
  )
}

export default CardBackground
