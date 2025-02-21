import React from 'react'

import Title from '../_title'

const TitleDisplaySize = (props) => {
  return (
    <div>
      <Title
          displaySize={25}
          tag="h1"
          text="Display Size 25"
          {...props}
      />
      <Title
          displaySize={33}
          tag="h1"
          text="Display Size 33"
          {...props}
      />
      <Title
          displaySize={50}
          tag="h1"
          text="Display Size 50"
          {...props}
      />
      <Title
          displaySize={66}
          tag="h1"
          text="Display Size 66"
          {...props}
      />
      <Title
          displaySize={75}
          tag="h1"
          text="Display Size 75"
          {...props}
      />
      <Title
          displaySize={100}
          tag="h1"
          text="Display Size 100"
          {...props}
      />
      <Title
          size="display"
          tag="h1"
          text="This is a long title"
          {...props}
      />
    </div>
  )
}

export default TitleDisplaySize
