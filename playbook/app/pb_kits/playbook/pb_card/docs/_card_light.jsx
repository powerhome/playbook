import React from 'react'
import Card from '../_card'

const CardLight = (props) => {
  return (
    <div>
      <Card borderNone
          height="100vh"
          margin="xl"
          position="absolute"
          top={{value: 'xs', inset: 'true'}}
          {...props}
      >{'Card content'}</Card>
    </div>
  )
}

export default CardLight
