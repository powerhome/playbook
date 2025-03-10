import React from 'react'
import { default as Background } from "../../pb_background/_background"

const BackgroundLight = (props) => (
  <Background
      backgroundColor="light"
      padding="xl"
      {...props}
  />
)

export default BackgroundLight
