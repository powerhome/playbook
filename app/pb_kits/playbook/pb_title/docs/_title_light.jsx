import React from "react"
import Title from "../_title.jsx"

function TitleLight() {
  return (
    <div>
      <Title size={4} tag="h4" text="Title 1" />
      <Title size={3} tag="h3" text="Title 2" />
      <Title size={2} tag="h2" text="Title 3" />
      <Title size={1} tag="h1" text="Title 4" />
    </div>
  )
}

export default TitleLight;
