import React from 'react'
import { default as Background } from "../../pb_background/_background"

const BackgroundGradient = (props) => (
  <Background
      backgroundColor="gradient"
      padding="xl"
      {...props}
  />
)

export default BackgroundGradient
