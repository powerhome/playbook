import React from 'react'
import { Hashtag } from '../../'

const HashtagLink = (props) => {
  return (
    <div>
      <Hashtag
          text="Same Window"
          type="project"
          url="https://google.com"
          {...props}
      />
      <br />
      <br />
      <Hashtag
          newWindow
          text="New Window"
          type="project"
          url="https://google.com"
          {...props}
      />
    </div>
  )
}

export default HashtagLink
