import React from "react"
import { Title } from "playbook-ui"
import { useOutletContext } from "react-router-dom"

export default function ComponentShow() {
  const isMobile = useOutletContext()

  return (
    <Title
      paddingTop={isMobile ? "md" : ""}
      text={"Component Show Page"}
      size='2'
    />
  )
}
