import React from 'react'

import Title from '../_title'

const TitleDefault = (props) => {
  return (
    <div>
      <Title
          marginBottom='md'
          text="Default Title"
          {...props}
      />
      <Title
          size={1}
          tag="h1"
          text="Title 1"
          {...props}
      />
      <Title
          size={2}
          tag="h2"
          text="Title 2"
          {...props}
      />
      <Title
          size={3}
          tag="h3"
          text="Title 3"
          {...props}
      />
      <Title
          size={4}
          tag="h4"
          text="Title 4"
          {...props}
      />
    </div>
  )
}

export default TitleDefault
