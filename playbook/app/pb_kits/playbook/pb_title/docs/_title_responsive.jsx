import React from "react"
import Title from "../_title"

const TitleResponsive = props => {
  return (
    <>
      <Title
        size={{ xs: "3", sm: "2", md: "1" }}
        text="Responsive Title"
        {...props}
      />
    </>
  )
}

export default TitleResponsive
