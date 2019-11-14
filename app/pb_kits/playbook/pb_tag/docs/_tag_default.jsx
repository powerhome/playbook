import React from "react"
import { Tag } from "../../"

function TagDefault() {
  return (
    <div>
      <Tag
          text="470297"
          type="project"
          url="https://google.com"
      />
      <br/><br/>
      <Tag
          text="123456"
          type="home"
          url="https://google.com"
      />
      <br/><br/>
      <Tag
          text="654321"
          type="default"
          url="https://google.com"
      />
    </div>
  )
}

export default Tag;
