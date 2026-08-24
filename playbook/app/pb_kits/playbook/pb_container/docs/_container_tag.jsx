import React from 'react'
import Container from '../../pb_container/_container'

const ContainerTag = (props) => {
  return (
    <>
  <Container
      tag="span"
      {...props}
  >
    Hello, I am a span container
  </Container>
  <br />
  <Container
      htmlOptions={{ href: "https://playbook.powerapp.cloud/", target: "_blank" }}
      tag="a"
      {...props}
  >
    Hello, I am a a container
  </Container>
  </>
  )
}

export default ContainerTag