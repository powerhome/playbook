import React from 'react'
import { Title } from '../../'

const TitleVariants = (props) => {
  return (
    <div>
      <Title
          size={4}
          tag="h4"
          text="Title 4 (link)"
          variant="link"
          {...props}
      />
    </div>
  )
}

export default TitleVariants
