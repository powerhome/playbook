import React from 'react'

import Title from '../_title'

const TitleLightWeight = (props) => {
  return (
    <div>
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
