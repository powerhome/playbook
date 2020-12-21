import React from 'react'
import { LoadingInline } from '../../'

const LoadingInlineLight = (props) => {
  return (
    <div>
      <LoadingInline
          {...props}
      />
      <LoadingInline
          align="center"
          {...props}
      />
      <LoadingInline
          align="right"
          {...props}
      />
    </div>
  )
}

export default LoadingInlineLight
