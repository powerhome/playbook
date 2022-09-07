import React from 'react'
import { Hashtag } from '../../'

const HashtagLink = (props) => {
  return (
    <div>
      <Hashtag
          text="Open in the same window"
          type="project"
          url="https://google.com"
          {...props}
      />
      <br />
      <br />
      <Hashtag
          newWindow
          text="Open in a new window"
          type="project"
          url="https://google.com"
          {...props}
      />
    </div>
  )
}

export default HashtagLink
