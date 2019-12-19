import React from 'react'
import { LoadingInline } from '../../'

const LoadingInlineDark = () => {
  return (
    <div>
      <LoadingInline dark />
      <LoadingInline
          align="center"
          dark
      />
      <LoadingInline
          align="right"
          dark
      />
    </div>
  )
}

export default LoadingInlineDark
