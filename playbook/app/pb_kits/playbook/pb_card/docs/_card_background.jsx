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
          {...props} >
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

      
    </div>
  )
}

export default CardBackground
