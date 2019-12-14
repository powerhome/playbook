import React from 'react'
import { Title } from '../../'

function TitleLight() {
  return (
    <div>
      <Title text="Default Title" />
      <br />
      <Title
          size={4}
          tag="h4"
          text="Title 4"
      />
      <Title
          size={3}
          tag="h3"
          text="Title 3"
      />
      <Title
          size={2}
          tag="h2"
          text="Title 2"
      />
      <Title
          size={1}
          tag="h1"
          text="Title 1"
      />
    </div>
  )
}

export default TitleLight
