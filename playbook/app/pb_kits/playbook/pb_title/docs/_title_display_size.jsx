import React from 'react'

import Title from '../_title'

const TitleDisplaySize = (props) => {
  return (
    <div>
      <Title
          displaySize="xs"
          tag="h1"
          text="Display Size xs"
          {...props}
      />
      <Title
          displaySize="sm"
          tag="h1"
          text="Display Size sm"
          {...props}
      />
      <Title
          displaySize="md"
          tag="h1"
          text="Display Size md"
          {...props}
      />
      <Title
          displaySize="lg"
          tag="h1"
          text="Display Size lg"
          {...props}
      />
      <Title
          displaySize="xl"
          tag="h1"
          text="Display Size xl"
          {...props}
      />
      <Title
          displaySize="xxl"
          tag="h1"
          text="Display Size xxl"
          {...props}
      />
      <Title
          size="display"
          tag="h1"
          text="This is a size of display"
          {...props}
      />
    </div>
  )
}

export default TitleDisplaySize
