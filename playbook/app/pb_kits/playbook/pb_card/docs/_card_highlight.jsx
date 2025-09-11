import React from 'react'

import Card from '../_card'

const CardHighlight = (props) => {
  return (
    <div>
      <Card
          {...props}
          highlight={{ position: 'side', color: 'product_6_highlight' }}
          marginBottom="sm"
      >
        {'Side Position & Product 6 Highlight Color'}
      </Card>

      <Card
          {...props}
          highlight={{ position: 'top', color: 'warning' }}
          marginBottom="sm"
      >
        {'Top Position & Warning Color'}
      </Card>

      <Card
          {...props}
          highlight={{ position: 'right_side', color: 'product_5_highlight' }}
          marginBottom="sm"
      >
        {'Side Position & Product 5 Highlight Color'}
      </Card>

      <Card
          {...props}
          highlight={{ position: 'side', color: 'category_2' }}
      >
        {'Side Position & Category 2 Color'}
      </Card>
    </div>
  )
}

export default CardHighlight
