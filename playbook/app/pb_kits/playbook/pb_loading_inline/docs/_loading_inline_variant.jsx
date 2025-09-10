import React from 'react'
import { LoadingInline } from 'playbook-ui'

const LoadingInlineVariant = (props) => {
  return (
    <div>
      <LoadingInline 
          text=" Dotted Spinner" 
          variant="dotted" 
          {...props}
      />

      <br />
  
      <LoadingInline
          text=" Solid Spinner"
          variant="solid"
          {...props}
      />
    </div>
  )
}

export default LoadingInlineVariant