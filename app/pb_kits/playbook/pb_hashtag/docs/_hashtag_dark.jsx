import React from "react"
import {Hashtag} from "../../"

function HashtagDark() {
  return (
    <div>
      <Hashtag
          dark
          text="470297"
          type="project"
          url="https://google.com"
      />
      <br/>
      <Hashtag
          dark
          text="123456"
          type="home"
          url="https://google.com"
      />
      <br/>
      <Hashtag
          dark
          text="654321"
          type="default"
          url="https://google.com"
      />
    </div>
  )
}

export default HashtagDark
