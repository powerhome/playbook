import React from 'react'
import Card from '../_card.jsx'

const CardLight = (props) => {
  return (
    <div>
      <Card
          flexDirection={{xs: "row", sm: "column", md: "rowReverse", lg: "columnReverse"}}
          {...props}
      >{'Card content'}</Card>
      <Card
          flexDirection="column"
          {...props}
      >{'Card content'}</Card>
      <Card
          flexDirection="rowReverse"
          {...props}
      >{'Card content'}</Card>
      <Card
          flexDirection="columnReverse"
          {...props}
      >{'Card content'}</Card>
    </div>
  )
}

export default CardLight
