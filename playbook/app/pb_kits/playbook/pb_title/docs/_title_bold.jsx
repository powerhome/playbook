import React from 'react'

import Title from '../_title'

const TitleBold = (props) => {
  return (
    <div>
      <Title
          size={4}
          tag="h4"
          text="Title 4"
          {...props}
      />
      <Title
          bold
          size={3}
          tag="h3"
          text="Title 3"
          {...props}
      />
      <Title
          bold
          size={2}
          tag="h2"
          text="Title 2"
          {...props}
      />
      <Title
          bold
          size={1}
          tag="h1"
          text="Title 1"
          {...props}
      />
    </div>
  )
}

export default TitleBold
