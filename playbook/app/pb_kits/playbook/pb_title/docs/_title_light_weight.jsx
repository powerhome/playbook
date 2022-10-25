import React from 'react'

import Title from '../_title'

const TitleLightWeight = (props) => {
  return (
    <div>
      <Title
          bold={false}
          size={3}
          tag="h3"
          text="Title 3"
          {...props}
      />
      <Title
          bold={false}
          size={2}
          tag="h2"
          text="Title 2"
          {...props}
      />
      <Title
          bold={false}
          size={1}
          tag="h1"
          text="Title 1"
          {...props}
      />
    </div>
  )
}

export default TitleLightWeight
