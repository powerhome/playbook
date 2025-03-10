import React from 'react'
import { default as Background } from "../../pb_background/_background"

const BackgroundWhite = (props) => (
  <div>
    <Background
        backgroundColor="white"
        padding="xl"
        {...props}
    />
  </div>

)

export default BackgroundWhite
