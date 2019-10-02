import React from "react"
import {Hashtag} from "../../"

function HashtagDefault() {
  return (
    <div>
      <Hashtag
          text="470297"
          type="project"
          url="https://google.com"
      />
      <br/><br/>
      <Hashtag
          text="123456"
          type="home"
          url="https://google.com"
      />
      <br/><br/>
      <Hashtag
          text="654321"
          type="default"
          url="https://google.com"
      />
    </div>
  )
}

export default HashtagDefault;
