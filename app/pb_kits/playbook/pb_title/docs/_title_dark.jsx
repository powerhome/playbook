import React from "react"
import Title from "../_title.jsx"

function TitleDark() {
  return (
    <div>
      <Title dark size={4} tag="h4" text="Title 1" />
      <Title dark size={3} tag="h3" text="Title 2" />
      <Title dark size={2} tag="h2" text="Title 3" />
      <Title dark size={1} tag="h1" text="Title 4" />
    </div>
  )
}

export default TitleDark;
