import React from 'react'
import Container from '../../pb_container/_container'

const ContainerGlobalProps = (props) => (
  <Container
      border="default"
      borderRadius="lg"
      hover={{ shadow: "deepest" }}
      maxWidth="sm"
      padding="md"
      shadow="deep"
      {...props}
  >
    Hello, I am a styled container
  </Container>
)

export default ContainerGlobalProps
