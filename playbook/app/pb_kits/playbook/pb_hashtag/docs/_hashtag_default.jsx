import React from 'react'
import Hashtag from '../../pb_hashtag/_hashtag'

const HashtagDefault = (props) => {
  return (
    <div>
      <Hashtag
          text="470297"
          type="project"
          url="https://google.com"
          {...props}
      />
      <br />
      <br />
      <Hashtag
          text="123456"
          type="home"
          url="https://google.com"
          {...props}
      />
      <br />
      <br />
      <Hashtag
          text="456789"
          type="appointment"
          url="https://google.com"
          {...props}
      />
      <br />
      <br />
      <Hashtag
          text="654321"
          type="default"
          url="https://google.com"
          {...props}
      />
    </div>
  )
}

export default HashtagDefault
