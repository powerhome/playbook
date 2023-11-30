import React from 'react'
import { Background } from '../..'

const BackgroundLight = (props) => (
  <Background
      tag="td"
      backgroundColor="light"
      padding="xl"
      htmlOptions={{ align: "left", colSpan: 12 }}
      {...props}
  >
    hi
  </Background>
)

export default BackgroundLight
