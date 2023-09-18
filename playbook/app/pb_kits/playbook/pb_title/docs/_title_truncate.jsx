import React from "react"

import Title from "../_title"

const TitleTruncate = (props) => {
  return (
    <div>
      <Title
          text='Title 1'
          truncate={1}
          {...props}
      />
      <Title
          text='Title 1'
          truncate={2}
          {...props}
      />
      <Title
          text='Title 1'
          truncate={3}
          {...props}
      />
      <Title
          text='Title 1'
          truncate={4}
          {...props}
      />
      <Title
          text='Title 1'
          truncate={5}
          {...props}
      />
    </div>
  )
}

export default TitleTruncate
