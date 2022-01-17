import React from 'react'

import Title from '../_title'

const TitleVariants = (props) => {
  return (
    <div>
      <Title
          color="default"
          size={4}
          tag="h4"
          text="Text Default"
          {...props}
      />
      <Title
          color="light"
          size={4}
          tag="h4"
          text="Text Light"
          {...props}
      />
      <Title
          color="lighter"
          size={4}
          tag="h4"
          text="Text Lighter"
          {...props}
      />
      <Title
          color="success"
          size={4}
          tag="h4"
          text="Text Success"
          {...props}
      />
      <Title
          color="error"
          size={4}
          tag="h4"
          text="Text Error"
          {...props}
      />
      <Title
          color="link"
          size={4}
          tag="h4"
          text="Text Link"
          {...props}
      />
    </div>
  )
}

export default TitleVariants
