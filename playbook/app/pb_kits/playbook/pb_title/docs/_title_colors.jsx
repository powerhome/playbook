import React from 'react'

import Title from '../_title'

const TitleColors = (props) => {
  return (
    <div>
      <Title
          text="Default Color"
          {...props}
      />
      <Title
          color="light"
          size={3}
          tag="h1"
          text="Title Color"
          {...props}
      />
      <Title
          color="lighter"
          size={3}
          tag="h1"
          text="Title Color"
          {...props}
      />
      <Title
          color="link"
          size={3}
          tag="h1"
          text="Title Color"
          {...props}
      />
      <Title
          color="success"
          size={3}
          tag="h1"
          text="Title Color"
          {...props}
      />
      <Title
          color="error"
          size={3}
          tag="h1"
          text="Title Color"
          {...props}
      />
    </div>
  )
}

export default TitleColors
